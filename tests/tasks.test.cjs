const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname,'../app.js'),'utf8');
const view = {tab:'all',subject:'all',query:'',sort:'date'};
const context = {
  taskView:view, S:{aip:'АиП',math:'Матан'},
  data:{tasks:[
    {id:1,title:'Предел',date:'2026-11-27',sub:'math',status:'Готово'},
    {id:2,title:'Дерево',date:'2026-11-30',sub:'aip',pinned:true,note:'сплей'}
  ]},
  done:t=>t.status==='Готово',subColor:()=>'#888888',I:()=>'',e:String,dmy:String
};
const render = vm.runInNewContext(source.slice(source.indexOf('function taskRow('),source.indexOf('function tasksPage('))+';taskListHTML',context);
assert(render().indexOf('Дерево')<render().indexOf('Предел'));
view.tab='archive';assert(render().includes('Предел'));assert(!render().includes('Дерево'));
view.tab='active';view.query=' СПЛЕЙ ';assert(render().includes('Дерево'));assert(!render().includes('Предел'));
view.subject='math';assert(render().includes('Ничего не найдено'));
console.log('OK: filter, archive, pin priority and note search');
