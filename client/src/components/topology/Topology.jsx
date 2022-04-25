import React, { useEffect } from "react"
import { Network } from 'vis-network'

const Topology = (props) => {
    const draw = () => {
        var nodes = []
        var edges = []
        var actNodes = []
        var pars = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        }
        var edgeLength = 50
        const edger = (item) => {
            if (item.userPri > 1) {
                const parPri = item.userPri - 1
                const parArr = pars[parPri]
                const randIn = Math.floor(Math.random() * parArr.length)
                const parent = parArr[randIn]
                edges.push({
                    from: item.id, 
                    to: parent.id, 
                    length: edgeLength * (parPri)   
                })
            }
        }
        const noder = (item) => {
            var icon = null
            if (item.userPri === 1){
                icon = 'https://i.imgur.com/3F2RyZI.png'
            }
            else if (item.userPri === 2){
                icon = 'https://i.imgur.com/ck9NFEZ.png'
            }
            else if (item.userPri === 3){
                icon = 'https://i.imgur.com/1z2Umfw.png'
            }
            else if (item.userPri === 4){
                icon = 'https://i.imgur.com/IS9QyvN.png'
            }
            else if (item.userPri === 5){
                icon = 'https://i.imgur.com/qnX5Ybq.png'
            }
            else {
                icon = 'https://i.imgur.com/2buUV33.png'
            }
            actNodes.push({
                id: item.id, 
                label: item.label + "\n" + item.title,
                image: icon,
                color: {
                    border: "#A9A9A9",
                    background: "#FFF"
                },
                shape: "circularImage",
                shadow: {
                    enabled: true
                },
                size: 55 - (item.userPri * 5),
                mass: 2 ** (1/item.userPri)
            })
        }

        props.data.map((item, index) => (
            nodes.push({ 
                id: index, 
                label: item.userName, 
                title: item.userRole, 
                userPri: item.userPri 
            })
        ))

        nodes.map((item) => (
            pars[item.userPri].push(item)
        ))

        nodes.map((item) => (
            edger(item)
        ))

        nodes.map((item) => (
            noder(item)
        ))

        var container = document.querySelector("#mytopology")
        var data = { nodes: actNodes, edges: edges }
        var options = {
            autoResize: true,
            interaction: {
                dragView: false,
                hover:true,
                tooltipDelay: 50,
                zoomView: false
            }, 
            height: '635px', 
            edges: { 
                smooth: true, 
                shadow: true
            },
            layout: {
                randomSeed: 1,
                improvedLayout: false,
                hierarchical: {
                    enabled: false,
                    direction: 'UD',
                    parentCentralization: false,
                    edgeMinimization: true,
                    blockShifting: true
                }
            }
        }

        const network = new Network(container, data, options)
        return network
    }

    useEffect(() => {
        draw()
    })

    return (
        <>
            <div id="mytopology"></div>
        </>
    )

}

export default Topology