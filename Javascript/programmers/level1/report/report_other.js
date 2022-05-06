const report = ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]
const id_list = ["muzi", "frodo", "apeach", "neo"]
const k = 2;

let reports = [...new Set(report)].map(a=>{return a.split(' ')});
reports 

let counts = new Map();

for (const bad of reports){
  counts.set(bad[1],counts.get(bad[1])+1||1)
}

counts

let good = new Map();
for(const report of reports){
  console.log(report[1])
  if(counts.get(report[1])>=k){
      good.set(report[0],good.get(report[0])+1||1)
  }
}

good

let answer = id_list.map(a=>good.get(a)||0)

