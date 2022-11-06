import {update_estyle_curves_list} from './diagram_app.js'

function inject_curve(svg_file){
    console.log("edge_styles_handles.inject_curves()")
    const item = document.createElement("div")
    item.classList.add("item")
    const curves = document.getElementById("curves")
    curves.appendChild(item );
    item.insertAdjacentHTML( 'beforeend', svg_file );
    update_estyle_curves_list(item)
}

function dropHandler(ev) {
    console.log('File(s) dropped');
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        //if(ev.dataTransfer.items.length != 1){alert("only one file allowed");return;}
        for (const item of ev.dataTransfer.items){
            if(item.kind != 'file'){alert("only item.kind file allowed");return;}
            const file = item.getAsFile();
            if(file.type != 'image/svg+xml'){alert("only svg files allowed");return;}
            console.log(`file.name = ${file.name} ; file.type = ${file.type}`);
            let reader = new FileReader();
            reader.onloadend = function(e){inject_curve(this.result)};
            reader.readAsText(file);
        }
    }
}

function dragOverHandler(ev) {
    ev.preventDefault();
}

export {
    dropHandler,
    dragOverHandler,
    inject_curve
}
