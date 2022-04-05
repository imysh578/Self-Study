package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	w := bufio.NewWriter(os.Stdout)

	defer w.Flush()

	var N int

	fmt.Fscanln(r, &N)

	var count int = 0

	var old, new int = N, N

	for {
		count++
		old = new
		if old < 10 {
			// 10보다 작으면 십의 자리에도 같은 숫자를 더해 두자리 숫자를 만든다
			new = old * 11
		} else {
			// 이전 값의 일의 자리 * 10 + 각 자리의 합에서 일의 자리
			var sum int = old/10 + old%10
			new = (old%10)*10 + (sum % 10)
		}

		// 기존 값으로 돌아왔으면 반복문 탈출
		if N == new {
			break
		}
	}
	fmt.Fprint(w, count)
}
