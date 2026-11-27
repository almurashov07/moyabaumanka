const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(require('node:path').join(__dirname,'../app.js'),'utf8');
const decide=vm.runInNewContext(source.slice(source.indexOf('function navDecision('),source.indexOf('function initSmartNav('))+';navDecision');
let s={y:0,down:0,hidden:false};
for(let y=10;y<=150;y+=10)s=decide(s,y,1000,false);
assert(s.hidden);s=decide(s,149,1000,false);assert(!s.hidden);
s=decide(s,300,1000,false);assert(s.hidden);s=decide(s,1005,1000,false);assert(s.hidden);
s=decide(s,500,1000,true);assert(!s.hidden);s=decide(s,-30,1000,false);assert.equal(s.y,0);
console.log('OK: navigation direction, thresholds, bounce, end of page, blocked state');
