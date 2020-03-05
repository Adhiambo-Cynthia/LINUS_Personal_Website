const url='sample.pdf'
let pdfDoc=null,
    pageNum=1,
    pageRendering=false,
    pageNumLoading=null
const scale=1.8
//get the document //This is where you start
pdfjsLib.getDocument(url).promise.then(pdfDoc_=>{pdfDoc=pdfDoc_   //Set PDFJS global object (so we can easily access in our page functions
    
    document.getElementById("page_count").textContent=pdfDoc.numPages
    Renderpage(pageNum)
}
)
     
    //render page by numbers  
const Renderpage= num=>{
    pageRendering=true
    //get page
    pdfDoc.getPage(num).then(page=>{
    
        //set scale  //We'll create a canvas for each page to draw it on
    const viewport=page.getViewport({scale}),    //This gives us the page's dimensions at full scale
        canvas=document.querySelector("#page_render"),
        ctx= canvas.getContext("2d") 
            canvas.height=viewport.height
            canvas.width=viewport.width
           
            //Draw it on the canvas
    const renderctx={
        canvasContext:ctx,viewport
            }                               //alternatively,page.render({canvasContext: context, viewport: viewport});

    page.render(renderctx).promise.then(()=>{
     pageRendering=false
    if(pageNumLoading!==null) {
        Renderpage(pageNumLoading)
        pageNumLoading=null
    }
    })  
    //output current page
    document.querySelector("#page_num").textContent=num  
    })

}
//check for pages rendering
const queueRenderpage= num=>{
    if(pageRendering){
        pageNumLoading=num
}
else{
    Renderpage(num)
}
}
//show previous 
const prev_page= ()=>{
    if(pageNum <= 1){
        return
    }
    pageNum--
    queueRenderpage(pageNum)
}
//show next page
const next_page= ()=>{
    if(pageNum >= pdfDoc.numPages){
        return
    }
    pageNum++
    queueRenderpage(pageNum)
}


    //button events
 document.querySelector("#prev_page").addEventListener('click', prev_page)   
 document.querySelector("#next_page").addEventListener('click', next_page) 