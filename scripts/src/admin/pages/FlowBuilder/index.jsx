import GraphBuilder from "../../components/GraphBuilder";
import Style from './style.module.css';

/**
 * Flow Builder component
 */
const FlowBuilder = () => {
    return (
        <div className={Style.container}>
            <GraphBuilder />
        </div>
    );
}

export default FlowBuilder;
