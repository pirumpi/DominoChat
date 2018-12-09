
    var width = window.innerWidth;
    var height = window.innerHeight;
    var ActualTileContainer;
    const tilesWidth=50;
    const tilesHeigth=100;
    const TilesBotMarging=20;
    const TilesRightMarging=3;
    const iniciaFichaEnManoEn=460;
    const iniciaFichaEnManoY=130;
    const tilesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28];
   

    var boardValueLeft=null;
    var boardValueRight=null;
    var tween=null;
    

class TileContainer{
    constructor(valuex, valuey,stage)
    {

        this.width= tilesWidth,
        this.height= tilesHeigth,
        this.x= valuex  ? valuex:(stage.getWidth() -tilesWidth)/2,
        this.y= valuey  ?valuey:(stage.getHeight() -tilesHeigth)/2,
        this.stroke= 'green',
        this.strokeWidth = 1,
        this.orientation = 0,
        this.draggable=false,
        this.valueLeft=0,
        this.valueRigt=0,
        this.initialPosition={
            x:this.x,
            y:this.y
        },
        this.scale= {
            x : 1,
            y : 1
        },
        this.startScale= 1

        

    }      

}

class Tile {
 
    constructor(valuex, valuey,stage,draggable)
    {

        
        this.x= valuex  ? valuex:stage.getWidth() -(stage.getWidth()-450),
        this.y= valuey  ? valuey:stage.getHeight() -(tilesHeigth+TilesBotMarging) ,
        this.width= tilesWidth,
        this.height= tilesHeigth,
        this.fill="white",
        this.strokeWidth= 0,
        this.draggable = draggable,
        this.orientation = 0,
        this.values =
            {
                head: null,
                tail:null
            }
        this.shadowColor='Black',
        this.shadowBlur= 10,
        this.initialPosition={
            x:this.x,
            y:this.y
        }
        this.shadowOffset= {
            x : 5,
            y : 5
        },
        this.scale= {
            x : 1,
            y : 1
        },
        this.startScale= 1,
        this.shadowOpacity= 0.6,
        this.isDouble=function(){
            return this.values.head==this.values.tail;
        }
        

    }

    
    get canUse(){
    return (this.valueLeft==boardValueLeft || this.valueLeft==boardValueRight) 
    || (this.valueRigt==boardValueLeft || this.valueLeft==boardValueRight) ;
    
    }

    setPosition(x,y){
        this.x=x;
        this.y=y;
    }
    returnInitialPosition(){
        this.x=this.initialPosition.x;
        this.y=this.initialPosition.y;
    }


}


class Board {
    constructor(){
        this.boardValues={
            head:null,
            tail:null
        },
        this.setValues=function(head,tail){
            this.boardValues.head=head;
            this.boardValues.tail=tail;
        }
     this.boardState =0,
     this.userCanPlay=true, 
     this.playedTiles=[]
    }
}

///Classes

function addTile(layer,stage, orientation,x,y,draggable,image,valor) {
    var box = new Konva.Rect(new Tile(x, y, stage, draggable));
    box.attrs.values = valor;
    if (orientation || orientation>0) 
        rotateAroundCenter(box,orientation);

    box.fillPriority('pattern');
    var imageObj = new Image();
    imageObj.onload = function() {
     
    box.fillPatternImage(imageObj);
    stage.draw();
    };
     imageObj.src = image;
     box.fillPatternRepeat("no-repeat");
     box.fillPatternScale({
        x:0.5,
        y:0.5
     });
    
    layer.add(box);
    //stage.draw();
    
 
}
function addTileContainer(layer,stage, orientation,x,y) {
    var box = new Konva.Rect(new TileContainer(x,y,stage));
    if (orientation)
    rotateAroundCenter(box,orientation);
    //box.rotate(orientation);
    layer.add(box);
    return box;
}
function CreateNextcontainer(orientation){
    ActualTileContainer= addTileContainer(layer,stage,orientation);
}

function AddTileGroupBot(layer,stage,tileList){
    
    const primera=iniciaFichaEnManoEn;
   
    shuffleTiles(tilesArray);

    var iniciaEn=0;
  for (let index = 0; index < 7; index++) {
    
        
    if(index>0)
    iniciaEn=iniciaEn + tilesWidth + TilesRightMarging;
    else
        iniciaEn = primera;
     
    let valores = tilesValues.find(valores=>valores.id == tilesArray[index]);
    addTile(layer,stage,0,iniciaEn,null,true,'/Content/tiles/'+tilesArray[index]+'.png',valores);
      
  }


}

function AddTileGroupTop(layer,stage){
    
    const primera=iniciaFichaEnManoEn;
   
    

    var iniciaEn=0;
  for (let index = 0; index < 7; index++) {
    
    
    if(index>0)
    iniciaEn=iniciaEn + tilesWidth + TilesRightMarging;
    else
    iniciaEn=primera;

    addTile(layer,stage,0,iniciaEn,10);
      
  }


}

function AddTileGroupLeft(layer,stage){
    
    const primera=iniciaFichaEnManoY;
   
    

    var iniciaEn=0;
  for (let index = 0; index < 7; index++) {
    
    
    if(index>0)
    iniciaEn=iniciaEn + tilesWidth + TilesRightMarging;
    else
    iniciaEn=primera;

    addTile(layer,stage,90,30,iniciaEn);
      
  }


}

function AddTileGroupRight(layer,stage){
    
    const primera=iniciaFichaEnManoY;
   
    

    var iniciaEn=0;
  for (let index = 0; index < 7; index++) {
    
    
    if(index>0)
    iniciaEn=iniciaEn + tilesWidth + TilesRightMarging;
    else
    iniciaEn=primera;

    addTile(layer,stage,-90, (stage.getWidth()-85),iniciaEn);
      
  }


}


function shuffleTiles(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



const rotatePoint = ({ x, y }, rad) => {
    const rcos = Math.cos(rad);
    const rsin = Math.sin(rad);
    return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

// will work for shapes with top-left origin, like rectangle
function rotateAroundCenter(node, rotation) {
    //current rotation origin (0, 0) relative to desired origin - center (node.width()/2, node.height()/2)
    const topLeft = { x: -node.width() / 2, y: -node.height() / 2 };
    const current = rotatePoint(topLeft, Konva.getAngle(node.rotation()));
    const rotated = rotatePoint(topLeft, Konva.getAngle(rotation));
    const dx = rotated.x - current.x,
      dy = rotated.y - current.y;

    node.rotation(rotation);
    node.x(node.x() + dx);
    node.y(node.y() + dy);
}