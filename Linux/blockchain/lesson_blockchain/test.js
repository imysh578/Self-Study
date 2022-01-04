function handleBlockResponse(message) {
	const receivedBlocks = JSON.parse(message.data);
	const lastBlockReceived = receivedBlocks[receivedBlocks.length - 1];
	const lastBlockHeld = bc.getLastBlock();
	if (lastBlockReceived.header.index > lastBlockHeld.header.index) {
		console.log(
			"블록의 갯수 \n" +
				`내가 받은 블록의 index 값 ${lastBlockReceived.header.index}\n` +
				`내가 가지고있는 블럭의 index 값 ${lastBlockHeld.header.index}\n`
		);
		if (
			bc.createHash(lastBlockHeld) === lastBlockReceived.header.previousHash
		) {
			//받은 블록 중 마지막 블록의 이전해시값이 내 마지막 블록으로 만들어진 암호화값이 같을떄 console.log(`마지막 하나만 비어있는경우에는 하나만 추가합니다.`)
			if (bc.addBlock(lastBlockReceived)) {
				broadcast(responseLastMsg());
			}
		} else if (receivedBlocks.length === 1) {
			//받은 블록의 길이가 1일 때 console.log(`피어로부터 블록을 연결해야합니다!`)
			broadcast(queryAllMsg());
		} else {
			//많이 차이가 날 때 console.log(`블럭을 최신화를 진행합니다.`)
			bc.replaceBlock(receivedBlocks);
		}
	} else {
		console.log("블럭이 이미 최신화입니다.");
	}
}
