import React, { memo } from 'react';
import {
    useReactFlow,
    Handle,
    Position,
    NodeToolbar,
} from '@xyflow/react';

import Portal from './Portal';

import style from './style.module.css';

/**
 * Toolbar component
 */
const ToolBar = ({ id, type, data, onTypeChange, onDelete }) => {
    return (
        <div className={style.toolBar}>
            <div>
                <label>Type</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="decision">Decision</option>
                    <option value="action">Action</option>
                    <option value="message">Message</option>
                    <option value="redirect">Redirect</option>
                </select>
            </div>
            <button onClick={onDelete} style={{ marginRight: 4 }}>Remove</button>
        </div>
    );
}

/**
 * Custom Node components
 */
const SingleNode = memo(({ id, data, type, selected }) => {
    
    const { setNodes, setEdges, getEdges } = useReactFlow();

    /**
     * Handle type changes of a node
     */
    const handleTypeChanges = ( newType ) => {
        setNodes( ( nodes ) => {
            return nodes.map( ( node ) => {
                return node.id === id ? { ...node, type: newType } : node
            });
        });
    }

    /**
     * Handle message change of a node
     */
    const handleDataChange = ( key, value ) => {
        setNodes( ( nodes ) => {
            return nodes.map( ( node ) => {
                return node.id === id ? { ...node, data: { ...node.data, [key]: value } } : node
            });
        });
    };

    /**
     * Handle delete of a node
     */
    const handleDelete = () => {
        if ( data.key === 'root' ) {
            window.alert( 'Unable to remove root node' );
            return;
        }

        // Remove connected edges
        setEdges((edges) =>
            edges.filter((edge) => edge.source !== id && edge.target !== id)
        );

        // Delete the node
        setNodes((nodes) => nodes.filter(( node ) => node.id !== id ));
    };

    return (
        <div
            className={style.singleNodeContainer}
        >
            
            {/* Toolbar component */}
            <NodeToolbar isVisible={selected} position={Position.Top}>
                <ToolBar
                    id={id}
                    type={type}
                    data={data}
                    onTypeChange={(newType) => handleTypeChanges(newType)}
                    onDelete={() => handleDelete()}
                />  
            </NodeToolbar>

            {/* Top Handle Connecter */}
            <Handle
                type="target"
                position={Position.Top}
                style={{
                    backgroundColor: '#007bff',
                    borderRadius: '50%',
                    width: 13,
                    height: 13,
                }}
            />
            
            {/* View container */}
            <div className={style.viewContainer}>
                <input value={data.label} onChange={(e) => handleDataChange('label', e.target.value )}/>
            </div>
            
            {/* Edit container */}
            {
                selected &&
                <Portal>
                    {/* key section */}
                    <div className={style.inputContainer}>
                        <label>Unique key</label>
                        <input
                            type='text'
                            name='key'
                            placeholder='Unique Key'
                            value={data.key}
                            onChange={(e) => {
                                handleDataChange('key', e.target.value );
                            }}
                        />
                    </div>
                    
                    {/* label section */}
                    <div className={style.inputContainer}>
                        <label>Label</label>
                        <input
                            type='text'
                            name='label'
                            placeholder='Enter Label'
                            value={data.label}
                            onChange={(e) => {
                                handleDataChange('label', e.target.value );
                            }}
                        />
                    </div>
                    
                    {/* message section */}
                    {
                        type != 'redirect' &&
                        <div className={style.inputContainer}>
                            <label>Message</label>
                            <textarea
                                name='message'
                                placeholder='Enter Message'
                                value={data.message}
                                onChange={(e) => {
                                    handleDataChange('message', e.target.value );
                                }}
                            />
                        </div>
                    }

                    {/* url section */}
                    {
                        type == 'redirect' &&
                        <div className={style.inputContainer}>
                            <label>Redirect Url</label>
                            <input
                                type='text'
                                name='url'
                                placeholder='https://example.com'
                                value={data.url}
                                onChange={(e) => {
                                    handleDataChange('url', e.target.value );
                                }}
                            />
                        </div>
                    }

                    {/* input section */}
                    {
                        type == 'action' &&
                        <div className={style.inputContainer}>
                            <label>Inputs</label>
                            <input
                                type='text'
                                name='inputs'
                                placeholder='Name | Email | Phone'
                                value={data.inputs}
                                onChange={(e) => {
                                    handleDataChange('inputs', e.target.value );
                                }}
                            />
                        </div>
                    }
                </Portal>

            }
            
            {/* Buttom Handle Connector */}
            {
                type != 'message' &&
                <Handle
                    type="source"
                    position={Position.Bottom} 
                    style={{
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        width: 13,
                        height: 13,
                    }}
                />
            }
        </div>
    );
});

export default SingleNode;
