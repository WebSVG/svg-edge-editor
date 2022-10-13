import { diagram_app } from "./diagram_app.js";

let diag = new diagram_app()

function load_svg(svg_file){
    document.getElementById("hint")?.remove()
    document.getElementsByTagName("svg")[0]?.remove()
    document.getElementById("editor").insertAdjacentHTML( 'beforeend', svg_file );
    const svgs = document.getElementsByTagName("svg")
    if(svgs[0])
    {
        diag.init(svgs[0])
    }

}

function dropHandler(ev) {
    console.log('File(s) dropped');
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        if(ev.dataTransfer.items.length != 1){alert("only one file allowed");return;}
        const item = ev.dataTransfer.items[0]
        if(item.kind != 'file'){alert("only item.kind file allowed");return;}
        const file = item.getAsFile();
        if(file.type != 'image/svg+xml'){alert("only svg files allowed");return;}
        console.log(`file.name = ${file.name} ; file.type = ${file.type}`);
        let reader = new FileReader();
        reader.onloadend = function(e){load_svg(this.result)};
        reader.readAsText(file);
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
}

export {
    dropHandler,
    dragOverHandler,
    load_svg
}
