// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VotingTest {
  // 후보자 이름 => 득표수
  mapping (string => uint) candidateVotedCount; // 후보자 득표 수 나태내는 매핑

  // 유권자의 지갑주소 => 투표 여부 (참/거짓)
  mapping (address => bool) haveVoteRight;      // 유권자의 투표권이 있는지 나타내는 매핑

  string[] candidates;      // 후보자를 담아두는 배열
  address[] finishedVoters; // 투표를 마친 유권자를 기록하는 배열

  constructor () {
    candidates = ["IronMan", "SpiderMan", "Thor"];
    if(isValidVoter()) {
      haveVoteRight[msg.sender] = true;
    }
  }

  function isValidVoter () private view returns (bool) {
    for(uint i; i < finishedVoters.length - 1; i++) {
      if (finishedVoters[i] == msg.sender) {
        return false;
      }
    }
    return true;
  }

  function getCandidateList () external view returns (string[] memory) {
    return candidates;
  }

  function getCandidateVotedCount(string memory _name) external view returns(uint) {
    return candidateVotedCount[_name];
  }

  function addCandidate (string memory _name) external {
    candidates.push(_name);
  }

  modifier voterValidation {
    require(haveVoteRight[msg.sender]);
    _;
  }

  function voting(string memory _name) external voterValidation {
    candidateVotedCount[_name]++;
    haveVoteRight[msg.sender] = false;
    finishedVoters.push(msg.sender);
  }

  function getMyVoteRight() external view returns (bool) {
    return haveVoteRight[msg.sender];
  }
  
}