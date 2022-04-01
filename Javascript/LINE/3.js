/**
문제 설명
어떤 회사에서 담당 업무에 따라 사원 몇 명을 재택근무로 전환하려 합니다. 업무는 재택 가능한 업무, 출근해야 할 업무 두 가지 종류가 있습니다. 어떤 사원의 업무가 재택 가능한 업무로만 이루어져 있다면, 그 사원은 재택근무 대상자입니다.

회사에는 1번부터 num_employees번까지 각각 다른 사원 번호를 가진 num_employees명의 사원들이 있습니다. 회사의 사원들은 num_teams개의 팀으로 나뉘어 있으며, 사원마다 소속된 팀 번호가 있습니다. 팀마다 최소 한 명은 출근해야 합니다. 만약 어떤 팀에서 팀원 모두가 재택근무 대상자일 때, 사원 번호가 가장 빠른 사람이 출근하기로 했습니다. 이에 해당하지 않는 재택근무 대상자들은 재택근무를 하게 됩니다. 당신은 재택근무를 하게 될 사원의 번호를 구하려 합니다.

다음과 같은 업무와 사원들의 정보가 있을 때의 예시를 들어보겠습니다.

재택 가능한 업무: development marketing hometask

출근해야 할 업무: recruitment education officetask

사원 번호	소속 팀 번호	담당 업무
1	1	development hometask
2	1	recruitment marketing
3	2	hometask
4	2	development marketing hometask
5	3	marketing
6	3	officetask
7	3	development
재택 가능한 업무만 하는 사원은 (1,3,4,5,7) 5명입니다.
1,3번 팀은 출근하는 팀원이 있지만 2번 팀은 모두 재택근무 대상자입니다. 그러므로, 2번 팀에서 사원 번호가 가장 빠른 3번 사원은 출근해야 합니다.
재택근무를 하게 될 사원은 (1,4,5,7) 4명입니다.
팀의 개수를 나타내는 정수 num_teams, 재택 가능한 업무들을 나타내는 문자열 배열 remote_tasks, 출근해야 할 업무들을 나타내는 문자열 배열 office_tasks, 사원들의 정보를 1번 사원부터 순서대로 나타내는 문자열 배열 employees가 매개변수로 주어집니다. 재택근무를 하게 될 사원들의 번호를 정수 배열에 오름차순으로 담아 return 하도록 solution 함수를 완성해 주세요. 최소 한 명 이상 재택근무를 하게 될 사원이 존재하는 경우만 주어집니다.

제한사항
1 ≤ num_teams ≤ 10
1 ≤ remote_tasks의 길이 ≤ 100
3 ≤ remote_tasks의 원소의 길이 ≤ 20
1 ≤ office_tasks의 길이 ≤ 100
3 ≤ office_tasks의 원소의 길이 ≤ 20
remote_tasks와 office_tasks는 중복되는 원소가 나타나지 않으며, 서로 중복되는 원소가 없습니다.
remote_tasks와 office_tasks의 원소는 알파벳 소문자로만 이루어져 있습니다.
num_teams < employees의 길이 = num_employees ≤ 100
employees의 원소는 "team_number task_list" 형태의 문자열입니다. team_number는 해당 사원의 팀 번호를 나타내고, task_list는 해당 사원의 담당 업무를 나타내는 문자열입니다.
1 ≤ team_number ≤ num_teams
1~num_teams의 각각의 팀에는 적어도 한 명 이상 소속된 팀원이 있습니다.
모든 사원은 최소 1개 ~ 최대 40개의 업무를 담당합니다.
task_list 는 담당 업무를 하나의 공백으로 구분해 담고 있습니다. 반드시 remote_tasks, office_tasks 둘 중 하나에 나타난 업무만 담겨있습니다.
task_list 에는 중복된 원소가 나타나지 않습니다.
입출력 예
num_teams	remote_tasks	office_tasks	employees	result
3	["development","marketing","hometask"]	["recruitment","education","officetask"]	["1 development hometask","1 recruitment marketing","2 hometask","2 development marketing hometask","3 marketing","3 officetask","3 development"]	[1,4,5,7]
2	["design"]	["building","supervise"]	["2 design","1 supervise building design","1 design","2 design"]	[3,4]
입출력 예 설명
입출력 예 #1

문제 예시와 동일합니다.
입출력 예 #2

재택 가능한 업무: design

출근해야 할 업무: building supervise

사원 번호	소속 팀 번호	담당 업무
1	2	design
2	1	supervise building design
3	1	design
4	2	design
재택 가능한 업무만 하는 사원은 (1,3,4) 3명입니다.
1번 팀은 출근하는 팀원이 있지만 2번 팀은 모두 재택근무 대상자입니다. 그러므로, 2번 팀에서 사원 번호가 가장 빠른 1번 사원은 출근해야 합니다.
재택근무를 하게 될 사원은 (3,4) 2명입니다.
 */