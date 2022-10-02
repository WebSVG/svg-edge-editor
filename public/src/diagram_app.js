import {Svg} from "./svg_utils.js"
import {EdgeStyle} from "./edge-style.js"
import {html} from "./web-js-utils.js"
import {Geometry} from "./geometry.js"

let geom = new Geometry()
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

let singleton = null

class diagram_app{
    constructor(){
        this.edges = []
        this.edge_style_list = []
        this.centers = []
        this.norms = []
        this.svg = null
        singleton = this
    }
    init(svg_el){
        this.edges = extract_edges(svg_el)
        this.edge_style_list = new Array(this.edges.length).fill(0);
        this.centers = new Array(this.edges.length).fill({x:0,y:0});
        this.norms = new Array(this.edges.length).fill({x:0,y:0});
        this.edges.forEach((edge,index)=>{
            this.centers[index] = geom.center(edge.v1,edge.v2)
            this.norms[index] = geom.distance(edge.v1,edge.v2)
        })
        this.svg = svg_el
        this.redraw(true)
    }

    redraw(blink){
        svg_utl.clear_svg(this.svg)
        this.draw_edges()
        this.draw_edges_centers(blink)
    }

    draw_edges(){
        svg_utl.set_parent(this.svg)
        let group = html(this.svg,/*html*/`<g id="svg_g_edges"/>`)
        let d = ""
        this.edges.forEach((e,i)=>{
                d = d + estyle.curved_line(e,this.edge_style_list[i])
        })
        return html(group,/*html*/`<path id="svg_path_edges" d="${d}" stroke="#111111" stroke-width="3" fill="none"/>`)
    }
    selector_click(e){
        const index = parseInt(e.target.id.split('-')[1])
        const that = singleton
        that.edge_style_list[index] += 1
        if(that.edge_style_list[index]>2){
            that.edge_style_list[index] = 0
        }
        console.log(`edge ${index} at ${that.edge_style_list[index]}`)
        that.redraw(false)
        e.stopPropagation()
    }
    draw_edges_centers(blink){
        svg_utl.set_parent(this.svg)
        let group = html(this.svg,/*html*/`<g id="svg_g_centers"/>`)
        this.centers.forEach((c,i)=>{
            const radius = Math.round(this.norms[i]/4)
            const edge_class = blink?"edge-blinker":""
            let selector = html(group,
                /*html*/`<circle id="edge-${i}" class="edge-selector ${edge_class}" cx=${c.x} cy=${c.y} r="${radius}" stroke-width="0" fill="#00000000"/>`)
            selector.addEventListener("click",this.selector_click)
        })
    }
}

export{diagram_app}
