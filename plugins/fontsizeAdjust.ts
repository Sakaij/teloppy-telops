


/**
 * 
 * @param $target 
 * @param $textElements 
 * @param setWidth	widthもセットするかどうか 
 */
export default function fontsizeAdjust($target: Element, $textElements: NodeListOf<Element>,setWidth:boolean=false): number {
    const fontSize = $textElements.length == 0 ? 16 : $target.clientWidth / $textElements.length - 1;
    
    $target.setAttribute(
        "style",
        "font-size:min(" + Math.floor(fontSize) + "px,90vh)"
    );
    if(setWidth){
        $textElements.forEach((e) => {
            e.setAttribute(
                "style",
                "max-width:min(" + Math.floor(fontSize) + "px,90vh)"
            );
        });
    }
    return Math.floor(fontSize);
}



