
    var width = window.innerWidth;
    var height = window.innerHeight;
    const tilesWidth=50;
    const tilesHeigth=100;
    const TilesBotMarging=20;
    const TilesRightMarging=3;
    const iniciaFichaEnManoEn=460;
    const iniciaFichaEnManoY=130;
    const tilesArray= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28];
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
        this.strokeWidth= 1,
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
        this.draggable= draggable,
        this.valueLeft=0,
        this.valueRigt=0
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
        this.shadowOpacity= 0.6
        

    }

    get isDouble( ){
      return this.valueLeft==this.valueRigt;
       
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
     this.boardNumber=0,
     this.boardState =0,
     this.aValue=null,
     this.bValue=null    
    }
}

///Classes

function addTile(layer,stage, orientation,x,y,draggable,image) {
    var box = new Konva.Rect(new Tile(x,y,stage,draggable));
    if (orientation==1) 
    box.rotate(90);

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
    if (orientation==1) 
    box.rotate(90);
    layer.add(box);
}

function AddTileGroupBot(layer,stage,tileList){
    
    const primera=iniciaFichaEnManoEn;
   
    shuffleTiles(tilesArray);

    var iniciaEn=0;
  for (let index = 0; index < 7; index++) {
    
        
    if(index>0)
    iniciaEn=iniciaEn + tilesWidth + TilesRightMarging;
    else
    iniciaEn=primera;
    addTile(layer,stage,0,iniciaEn,null,true,'/Content/tiles/'+tilesArray[index]+'.png');
      
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

    addTile(layer,stage,1,150,iniciaEn);
      
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

    addTile(layer,stage,1, (stage.getWidth()-50),iniciaEn);
      
  }


}


function shuffleTiles(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
