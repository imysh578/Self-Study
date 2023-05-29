/** import near contract standards **/
use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata,
    NonFungibleTokenMetadataProvider,
    TokenMetadata,
    NFT_METADATA_SPEC,
};
use near_contract_standards::non_fungible_token::{ Token, TokenId };
use near_contract_standards::non_fungible_token::NonFungibleToken;
use near_sdk::borsh::{ self, BorshDeserialize, BorshSerialize };

/** import near sdk **/
use near_sdk::collections::LazyOption;
use near_sdk::{
    env,
    near_bindgen,
    AccountId,
    BorshStorageKey,
    PanicOnDefault,
    Promise,
    PromiseOrValue,
};

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    Enumeration,
    Approval,
}

// #[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
// #[serde(crate = "near_sdk::serde")]
pub struct SoulboundToken {
    pub token: Token,
    pub soulbound: bool,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct SBTContract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    last_token_id: u128, // TODO: overflow 대비는 어떻게?
    // total_supply: u128,
}

#[near_bindgen]
impl SBTContract {
    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        metadata.assert_valid();
        Self {
            tokens: NonFungibleToken::new(
                StorageKey::NonFungibleToken,
                owner_id,
                Some(StorageKey::TokenMetadata),
                Some(StorageKey::Enumeration),
                Some(StorageKey::Approval)
            ),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),
            last_token_id: 0,
        }
    }

    #[payable]
    pub fn sbt_mint(
        &mut self,
        receiver_id: AccountId,
        token_metadata: TokenMetadata,
        soulbound: bool
    ) -> SoulboundToken {
        // assert_eq!(env::predecessor_account_id(), self.tokens.owner_id, "Unauthorized");

        self.last_token_id += 1;
        let token_id = self.last_token_id.to_string();
        let token = self.tokens.internal_mint(token_id.clone(), receiver_id, Some(token_metadata));
        let soulbound_token = SoulboundToken {
            token: token.clone(),
            soulbound,
        };

        soulbound_token
    }

    #[payable]
    pub fn sbt_transfer(&mut self, token_id: TokenId, receiver_id: AccountId) {
        self.tokens.internal_transfer(
            &env::predecessor_account_id(),
            &receiver_id,
            &token_id,
            None,
            None
        );
    }

    pub fn sbt_lock(&mut self, token_id: TokenId) {
        //TODO:

    }

    pub fn sbt_unlock(&mut self, token_id: TokenId) {
        //TODO:
    }
}