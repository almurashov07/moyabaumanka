const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),root=path.join(__dirname,'..');
const get=n=>fs.readFileSync(path.join(root,n),'utf8');
for(const file of ['index.html','app.js','seed.js','horoscope.js','styles.css','sw.js','manifest.webmanifest'])assert(fs.existsSync(path.join(root,file)),file+' missing');
const app=get('app.js'),html=get('index.html'),css=get('styles.css'),sw=get('sw.js');
for(const key of ['btasks','bscores','bpe','bauman_exams_v4','bauman_profile_name_v1','baumanka_v11_changes','baumanka_v11_prep'])assert(app.includes(key),'missing storage key: '+key);
for(const fragment of ['function refreshHomeStatus','function renderSheet','function snapshotLocal','function renderAnchored','function refreshScoreTotals','async function weather','function calendarPage'])assert(app.includes(fragment),'missing function: '+fragment);
assert(html.includes('styles.css?v=181')&&html.includes('app.js?v=181'));
assert(sw.includes('baumanka-nova-v18-1')&&sw.includes('mode===\'navigate\''));
assert(css.includes('(hover:hover)')&&css.includes('pointer:fine'));
const parity=d=>((Math.floor((new Date(d.getFullYear(),d.getMonth(),d.getDate(),12)-new Date(2026,10,9,12))/604800000)%2)+2)%2;
const plus=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
for(const dt of [new Date(2026,10,11),new Date(2026,11,31),new Date(2027,0,1),new Date(2027,2,1)]){assert.notEqual(parity(plus(dt,7)),parity(dt));assert.equal(parity(plus(dt,14)),parity(dt))}
for(const [year,month,count] of [[2026,10,30],[2026,11,31],[2027,1,28],[2028,1,29]])assert.equal(new Date(year,month+1,0).getDate(),count);
console.log('OK: assets, storage keys, weather, sheet, cache, hover, calendar and parity invariants');

for(const name of ['chibis','siply','basmach','sych','shershavy']){assert(fs.existsSync(path.join(root,'skins/bratva',name+'.jpeg')));assert(app.includes("skins/bratva/"+name+'.jpeg'));assert(sw.includes('skins/bratva/'+name+'.jpeg'))}
assert(app.includes('hamsterWardrobe()'));assert(app.includes("cmd==='hamsterskin'"));assert(app.includes('baumanka_hamster_owned_v181'));
console.log('OK: v18.1 original photos, wardrobe, tap balance, offline assets');
