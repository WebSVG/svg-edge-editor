import {Svg} from "./svg_utils.js"
import {EdgeStyle} from "./edge-style.js"
import {html} from "./web-js-utils.js"

let svg_utl = new Svg()
let estyle = new EdgeStyle()

function get_all_points_list(c){
    let text_p_list = c.split(/[\s,]+/)
    let result = []
    const nb_edges = text_p_list.length /6
    for(let i=0;i<nb_edges;i++){
        let M  = text_p_list[i*6]
        let x1  = parseFloat(text_p_list[i*6 + 1])
        let y1  = parseFloat(text_p_list[i*6 + 2])
        let L  = text_p_list[i*6+3]
        let x2  = parseFloat(text_p_list[i*6 + 4])
        let y2  = parseFloat(text_p_list[i*6 + 5])
        if((M=="M") && (L=="L") && !isNaN(x1) && !isNaN(y1)&& !isNaN(x2)&& !isNaN(y2)){
            result.push({v1:{x:x1,y:y1},v2:{x:x2,y:y2}})
        }
    }
    return result
}


function extract_edges(svg){
    let result = []
    const paths = svg.getElementsByTagName("path")
    Array.prototype.slice.call(paths).forEach((path)=>{
        const edges_list = get_all_points_list(path.getAttribute("d"))
        result.push(...edges_list)
    })
    return result;
}

class diagram_app{
    constructor(){
        this.edges = []
        this.edge_style_list = []
        this.svg = null
    }
    init(svg_el){
        svg_el.addEventListener("click",(e)=>{this.click(e)})
        this.edges = extract_edges(svg_el)
        this.edge_style_list = new Array(this.edges.length).fill(0);
        console.log(this.edges)
        this.svg = svg_el
    }
    click(e){
        console.log(`clicked on (${e.offsetX},${e.offsetY}) `)
        this.redraw()
    }

    redraw(){
        svg_utl.clear_svg(this.svg)
        this.draw_edges()
    }

    draw_edges(){
        svg_utl.set_parent(this.svg)
        let group = html(this.svg,/*html*/`<g id="svg_g_edges"/>`)
        let d = ""
        this.edges.forEach((e,i)=>{
                d = d + estyle.curved_line(e,this.edge_style_list[i])
        })
        return html(group,/*html*/`<path id="svg_path_edges" d="${d}" stroke="red" stroke-width="2" fill="none"/>`)
    }
}

export{diagram_app}
