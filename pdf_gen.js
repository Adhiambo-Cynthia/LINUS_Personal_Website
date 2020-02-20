const url='my_pdf.pdf'
let pdfDoc=null,
    pageNum=1,
    pageRendering=false,
    pageNumLoading=null
const scale=1.8,
    canvas=document.querySelector("#page_render"),
    ctx= canvas.getContext("2d") 
    //render page by numbers  
const Renderpage= num=>{
    pageRendering=true
    //get page
    pdfDoc.getPage(num).then(page=>{
    //set scale
    const viewport=page.getViewport({scale})
            canvas.height=viewport.height
            canvas.width=viewport.width
    const renderctx={
        canvasContext:ctx,viewport
            } 
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


//get the document
pdfjsLib.getDocument(url).promise.then(pdfDoc_=>{pdfDoc=pdfDoc_
    console.log(pdfDoc)
    document.getElementById("page_count").textContent=pdfDoc.numPages
    Renderpage(pageNum)
}
    )
    //button events
 document.querySelector("#prev_page").addEventListener('click', prev_page)   
 document.querySelector("#next_page").addEventListener('click', next_page) 