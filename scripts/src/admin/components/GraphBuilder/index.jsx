import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import SingleNode from './SingleNode';
import CustomPanal from './CustomPanal';
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    Panel,
    MiniMap,
    Controls,
    reconnectEdge,
    MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Style from './style.module.css';

import {
    setGraphNodes,
    setGraphEdges,
    setGraphViewPort,
} from '../../features/flowBuilder/flowBuilderSlice';

/**
 * Nodes type:
 *      'decision' => 'key' 'message'                 // Intermediate node
 *      'message'  => 'key' 'message'                 // End node
 *      'action'   => 'key', 'message', inputs  // Take inputs from user and do action
 *      'redirect' => 'key', 'url',                    // Redirect to a particular url
 */

/**
 * Storage key for store in localstorage for backup purpose
 */
const STORAGEKEY = 'dessiongraph';

/**
 * Create a new node
 */
function createNewNode() {
    
    return {
        id:       uuidv4(),
        type:     'decision',
        data:     { message: '', label: '', key: '' },
        position: { x: 0, y: 0 }
    }
}

/**
 * Define node types
 */
const nodeTypes = {
    decision: SingleNode,
    message:  SingleNode,
    action:   SingleNode,
    redirect: SingleNode,
};

/**
 * Main graph builder component
 */
const GraphBuilder = () => {
    
    // Get state varaible form store
    const flowBuilderState = useSelector(( state ) => state.flowBuilder );

    const dispatch = useDispatch();

    const [nodes, setNodes, onNodesChange] = useNodesState( flowBuilderState.nodes );
    const [edges, setEdges, onEdgesChange] = useEdgesState( flowBuilderState.edges );
    const [rfInstance, setRfInstance] = useState(null);
    const containerRef = useRef(null);
    const { setViewport, getViewport } = useReactFlow();

    const edgeReconnectSuccessful = useRef(true);


    useEffect(() => {
        setNodes(flowBuilderState.nodes);
        setEdges(flowBuilderState.edges);
        setViewport(flowBuilderState.viewport);
    }, []);

    useEffect(() => {
        dispatch(setGraphNodes(nodes));
        dispatch(setGraphEdges(edges));
        dispatch(setGraphViewPort(getViewport()))
    }, [nodes, edges]);

    /**
     * Handle on reconnect start
     */
    const onReconnectStart = useCallback(() => {
        edgeReconnectSuccessful.current = false;
    }, []);

    /**
     * Handle on reconnect
     */
    const onReconnect = useCallback((oldEdge, newConnection) => {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    }, []);
    
    /**
     * Handle on reconnect end
     */
    const onReconnectEnd = useCallback((_, edge) => {
        if (!edgeReconnectSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }
     
        edgeReconnectSuccessful.current = true;
    }, []);

    /**
     * Function on connect
     */
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    /**
     * Handle add new node
     */
    const handleAddNode = useCallback(() => {
        
        const newNode  = createNewNode();
        const viewport = getViewport();
        const containerRect = containerRef.current.getBoundingClientRect();

        newNode.position.x =  -viewport.x / viewport.zoom + (containerRect.width) / 2 / viewport.zoom - 175;
        newNode.position.y =  -viewport.y / viewport.zoom + (containerRect.height) / 2 / viewport.zoom - 50;

        setNodes((nodes) => nodes.concat(newNode));
    }
    , [setNodes]);

    /**
     * Handle clear all data
     */
    const handleClearAll = () => {
        setNodes([]);
        setEdges([]);
        setViewport({});
    }

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}

            onReconnect={onReconnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            
            onConnect={onConnect}
            onInit={setRfInstance}
            
            nodeTypes={nodeTypes}
            fitViewOptions={{ padding: 2 }}
            className={Style.container}
            ref={containerRef}

            // 🔽 HERE IS THE MAGIC
            defaultEdgeOptions={{
                type: 'default',
                style: { stroke: '#007BFF', strokeWidth: 1.2 },
                markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#007BFF',
                },
            }}
        >
            <MiniMap/>
            <Controls/>
            <Background />
            <Panel position="top-left">
                <CustomPanal
                    onAddNode={() => handleAddNode()}
                    onClearAll={() => handleClearAll()}
                    onSave={() => console.log(nodes, edges)}
                />
            </Panel>
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <GraphBuilder />
    </ReactFlowProvider>
);
