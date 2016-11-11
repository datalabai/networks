$(function(){

var network = cytoscape({
  container: document.getElementById('network'),

  boxSelectionEnabled: false,
  autounselectify: true,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)'
      })
    .selector('edge')
      .css({
        'target-arrow-shape': 'triangle',
        'width': 4,
        'line-color': '#ddd',
        'target-arrow-color': '#ddd',
        'curve-style': 'bezier'
      })
    .selector('.highlighted')
      .css({
        'background-color': '#61bffc',
        'line-color': '#61bffc',
        'target-arrow-color': '#61bffc',
        'transition-property': 'background-color, line-color, target-arrow-color',
        'transition-duration': '0.5s'
      })
});


// create nodes
let size = [3, 4, 2];
let X = 1000, Y = 1000;

for (let i = 0; i < size.length; i++) {
  for (let j = 0; j < size[i]; j++) {
    network.add({
      group: "nodes",
      data: {id: (i * 10 + j).toString(), weight: 100},
      position: { x: X/2 + (i * 2 - size.length) * 100, y: Y/2 + (2 * j - size[i]) * 100 }
    });
  }
}

// create edges
iterator = size.slice(0, -1).entries();
for (let e of iterator) {
  for(let j = 0; j < e[1]; j++){
    for(let k = 0; k < size[e[0]+1]; k++){
      network.add({
        group: "edges",
        data: {source: (e[0] * 10 + j).toString(), target: ((e[0]+1) * 10 + k).toString()}
      });
    }
  }
}

/*
var bfs = network.elements().bfs('#a', function(){}, true);

var i = 0;
var highlightNextEle = function(){
  if( i < bfs.path.length ){
    bfs.path[i].addClass('highlighted');

    i++;
    setTimeout(highlightNextEle, 1000);
  }
};

// kick off first highlight
highlightNextEle();
*/
});
