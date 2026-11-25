'use strict';

// Demo records. Replace with real projects and dates when available.
const projects = [
  { id:'graph', title:'Path Finder', subtitle:'점과 점 사이, 가장 짧은 연결', category:'GRAPH EXPLORATION', date:'2026-11-18', type:'graph', color:'blue', tags:['Graph','BFS'], description:'그래프에서 출발점과 도착점을 연결하는 경로를 탐구하는 학습 아이디어입니다. 가중치가 같은 간선으로 이루어진 그래프에서는 BFS로 간선 수가 가장 적은 경로를 찾을 수 있습니다.' },
  { id:'sort', title:'Sorting Studio', subtitle:'순서를 만드는 알고리즘의 원리', category:'ALGORITHM STUDY', date:'2026-11-25', type:'sort', color:'lilac', tags:['Merge sort','Divide & conquer'], description:'배열을 나누고 다시 합치며 정렬하는 병합 정렬을 다룹니다. 이 사이트의 최신순·제목순 버튼에도 실제로 병합 정렬이 연결되어 있습니다. 아래 Live Sort Trace에서 각 병합 단계와 비교 횟수를 확인할 수 있습니다.' },
  { id:'stack', title:'Undo Lab', subtitle:'마지막 행동부터, 한 걸음 되돌리기', category:'DATA STRUCTURE', date:'2026-10-28', type:'stack', color:'peach', tags:['Stack','LIFO'], description:'가장 나중에 저장한 항목이 먼저 나오는 스택을 학습하는 프로젝트 아이디어입니다. 편집 작업을 스택에 저장하면 마지막 작업부터 꺼내어 실행 취소를 구현할 수 있습니다.' },
  { id:'tree', title:'Binary Garden', subtitle:'가지마다 쌓아가는 탐색의 규칙', category:'DATA STRUCTURE', date:'2026-11-05', type:'tree', color:'mint', tags:['Binary search tree','Search'], description:'각 노드의 왼쪽에는 작은 값, 오른쪽에는 큰 값을 배치하는 이진 탐색 트리를 다룹니다. 트리 모양에 따라 탐색 성능이 어떻게 달라지는지 살펴보는 학습 아이디어입니다.' },
  { id:'hash', title:'Hash Notes', subtitle:'키 하나로 찾아가는 작은 기록', category:'DATA STRUCTURE', date:'2026-11-12', type:'hash', color:'yellow', tags:['Hash table','Key–value'], description:'키를 해시 함수로 변환하여 값을 저장하고 찾는 해시 테이블을 다룹니다. 서로 다른 키가 같은 위치를 가리킬 때 발생하는 충돌과 그 처리 방법을 탐구하는 학습 아이디어입니다.' },
  { id:'web', title:'First Homepage', subtitle:'배움을 담아두는 나만의 웹 공간', category:'WEB EXPERIMENT', date:'2026-11-23', type:'web', color:'sky', tags:['HTML / CSS / JS','Personal website'], description:'지금 보고 있는 개인 웹사이트입니다. 소개와 관심 주제를 담고, 방문자가 프로젝트 카드를 정렬하며 병합 정렬을 직접 체험할 수 있도록 구성했습니다. 별도 설치 없이 브라우저에서 실행됩니다.' }
];

/** Stable merge sort. Does not mutate input. No built-in array sort is used.
 * Algorithm: O(n log n) time, O(n) auxiliary space.
 * Educational snapshots additionally retain O(n log n) references.
 */
function mergeSort(input, compare) {
  let comparisons = 0;
  const steps = [];
  function divide(items) {
    if (items.length <= 1) return items.slice();
    const middle = Math.floor(items.length / 2);
    const left = divide(items.slice(0, middle));
    const right = divide(items.slice(middle));
    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      comparisons++;
      // Prefer the left run for equal keys to preserve stability.
      if (compare(left[i], right[j]) <= 0) merged.push(left[i++]);
      else merged.push(right[j++]);
    }
    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);
    steps.push({ left:left.slice(), right:right.slice(), merged:merged.slice() });
    return merged;
  }
  const items = divide(input);
  return { items, comparisons, steps };
}

const illustrations = {
  graph:'<path d="M90 130 155 65 245 90 310 145 210 175 90 130M155 65l55 110M245 90l-35 85"/><path class="highlight-path" d="m90 130 65-65 90 25 65 55"/><circle cx="90" cy="130" r="15"/><circle cx="155" cy="65" r="15"/><circle cx="245" cy="90" r="15"/><circle cx="310" cy="145" r="15"/><circle cx="210" cy="175" r="15"/>',
  sort:'<rect x="90" y="120" width="30" height="60" rx="5"/><rect x="137" y="80" width="30" height="100" rx="5"/><rect x="184" y="100" width="30" height="80" rx="5"/><rect x="231" y="45" width="30" height="135" rx="5"/><rect x="278" y="65" width="30" height="115" rx="5"/><path d="M85 195h230"/>',
  stack:'<path d="m120 160 80-40 80 40-80 40Z"/><path d="m120 120 80-40 80 40-80 40Z"/><path d="m120 80 80-40 80 40-80 40Z"/><path d="M310 70v95m-12-12 12 12 12-12"/>',
  tree:'<path d="m200 50-75 65m75-65 75 65m-150 0-40 60m40-60 40 60m110-60-40 60m40-60 40 60"/><circle cx="200" cy="50" r="18"/><circle cx="125" cy="115" r="16"/><circle cx="275" cy="115" r="16"/><circle cx="85" cy="175" r="12"/><circle cx="165" cy="175" r="12"/><circle cx="235" cy="175" r="12"/><circle cx="315" cy="175" r="12"/>',
  hash:'<rect x="105" y="45" width="65" height="40" rx="7"/><rect x="105" y="100" width="65" height="40" rx="7"/><rect x="105" y="155" width="65" height="40" rx="7"/><rect x="245" y="45" width="65" height="40" rx="7"/><rect x="245" y="100" width="65" height="40" rx="7"/><rect x="245" y="155" width="65" height="40" rx="7"/><path d="M170 65h75m-75 55 75 55m-75 0 75-55"/>',
  web:'<rect x="85" y="45" width="230" height="150" rx="10"/><path d="M85 75h230m-205-15h2m12 0h2m12 0h2"/><rect x="107" y="96" width="85" height="76" rx="4"/><path d="M212 103h77m-77 22h57m-57 22h68m-68 22h40"/>'
};
let visibleProjects = projects.slice();
let trace = [], stepIndex = 0, activeMode = 'date';
const grid = document.querySelector('#project-grid');
const dialog = document.querySelector('#project-dialog');
const titleCompare = new Intl.Collator('en', { sensitivity:'base', numeric:true });
const comparators = {
  date:(a,b) => a.date === b.date ? 0 : a.date > b.date ? -1 : 1,
  title:(a,b) => titleCompare.compare(a.title,b.title)
};
function renderProjects() {
  grid.replaceChildren();
  for (const project of visibleProjects) {
    const article = document.createElement('article');
    article.className = 'project-card';
    article.innerHTML = `<button class="project-open" aria-label="${project.title} 설명 보기"><div class="project-art ${project.color}"><span class="art-category">${project.category}</span><svg viewBox="0 0 400 240" aria-hidden="true">${illustrations[project.type]}</svg><span class="card-open-icon" aria-hidden="true">＋</span></div><div class="card-meta"><span>${project.tags[0]}</span><time datetime="${project.date}">${project.date.replaceAll('-','.')}</time></div><h3>${project.title}</h3><p class="card-subtitle">${project.subtitle}</p></button>`;
    article.querySelector('button').addEventListener('click', () => openProject(project));
    grid.append(article);
  }
  document.querySelector('#project-count').textContent = `${visibleProjects.length} PROJECTS`;
}
function openProject(project) {
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-tags').replaceChildren(...project.tags.map(tag => {
    const span = document.createElement('span'); span.textContent = tag; return span;
  }));
  dialog.showModal();
}
function makeTraceRun(label, items, result = false) {
  const wrapper = document.createElement('div');
  wrapper.className = `trace-run${result ? ' result-run' : ''}`;
  const heading = document.createElement('span');
  heading.className = 'run-label'; heading.textContent = label;
  const list = document.createElement('ol'); list.className = 'run-items';
  for (const item of items) {
    const chip = document.createElement('li');
    chip.textContent = activeMode === 'date' ? `${item.title} · ${item.date.slice(5).replace('-','.')}` : item.title;
    list.append(chip);
  }
  wrapper.append(heading,list); return wrapper;
}
function renderTrace() {
  const stage = document.querySelector('#trace-stage'); stage.replaceChildren();
  const step = trace[stepIndex];
  document.querySelector('#step-label').textContent = step ? `병합 단계 ${stepIndex+1} / ${trace.length}` : '아직 정렬하지 않았어요';
  document.querySelector('#step-prev').disabled = !step || stepIndex === 0;
  document.querySelector('#step-next').disabled = !step || stepIndex === trace.length-1;
  if (!step) {
    const message = document.createElement('p'); message.className = 'empty-trace';
    message.textContent = '카드를 섞었어요. 최신순이나 제목순을 눌러 새로운 병합 과정을 확인해 보세요.';
    stage.append(message); return;
  }
  stage.append(makeTraceRun('왼쪽',step.left),makeTraceRun('오른쪽',step.right),makeTraceRun('병합 결과',step.merged,true));
}
// Both sorting buttons call this function, which always calls mergeSort().
function applySort(mode) {
  activeMode = mode;
  const result = mergeSort(visibleProjects,comparators[mode]);
  visibleProjects = result.items; trace = result.steps; stepIndex = 0;
  const label = mode === 'date' ? '최신순' : '제목순 A–Z';
  document.querySelectorAll('[data-sort]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.sort === mode)));
  document.querySelector('#metric-size').innerHTML = `${visibleProjects.length}<span>개</span>`;
  document.querySelector('#metric-comparisons').innerHTML = `${result.comparisons}<span>회</span>`;
  document.querySelector('#metric-merges').innerHTML = `${trace.length}<span>회</span>`;
  document.querySelector('#trace-mode').textContent = label;
  document.querySelector('#sort-status').textContent = `병합 정렬로 ${label} 정렬 완료 · ${result.comparisons}번 비교, ${trace.length}번 병합`;
  renderProjects(); renderTrace();
}
document.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => applySort(button.dataset.sort)));
document.querySelector('#shuffle-button').addEventListener('click', () => {
  const previous = visibleProjects.map(item => item.id).join(',');
  // Fisher–Yates randomizes the input. Sorting itself uses mergeSort above.
  for (let i=visibleProjects.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [visibleProjects[i],visibleProjects[j]] = [visibleProjects[j],visibleProjects[i]];
  }
  if (visibleProjects.map(item => item.id).join(',') === previous) visibleProjects.push(visibleProjects.shift());
  trace = [];
  document.querySelectorAll('[data-sort]').forEach(button => button.setAttribute('aria-pressed','false'));
  document.querySelector('#sort-status').textContent = '카드를 섞었어요. 정렬 기준을 선택해 병합 정렬을 실행해 보세요.';
  document.querySelector('#trace-mode').textContent = '정렬 대기';
  document.querySelector('#metric-comparisons').innerHTML = '—<span>회</span>';
  document.querySelector('#metric-merges').innerHTML = '—<span>회</span>';
  renderProjects(); renderTrace();
});
document.querySelector('#step-prev').addEventListener('click', () => { if (stepIndex>0) { stepIndex--; renderTrace(); } });
document.querySelector('#step-next').addEventListener('click', () => { if (stepIndex<trace.length-1) { stepIndex++; renderTrace(); } });
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom) dialog.close();
});
applySort('date');
