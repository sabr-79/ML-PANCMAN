// import needed atoms

// format graph so it doesn't wreck the already cluttered UI

// make it so it updates with each image and shows the confidence score clearly

import {useAtom} from "jotai";
import {imgSrcArrAtom, predictionAtom, probabilitiesAtom, confidenceAtom, lossAtom} from "../GlobalState";

export default function ModelVisualizer(){
    const [data] = useAtom(imgSrcArrAtom);
    //const [loss] = useAtom(lossAtom);
    const [prediction] = useAtom(predictionAtom);
    const [probabilities] = useAtom(probabilitiesAtom);
    const [confidence] = useAtom(confidenceAtom);

    const directionLabels = {
        0: "right",
        1: "up",
        2: "left",
        3: "down"
    }

    
    return(
        <div className ="Visualization">
            <h4>Current Insights</h4>

            <section>
                <p>Prediction: {directionLabels[prediction] ?? "-"}</p>
                <p>Confidence: {confidence ? confidence.toFixed(2) : "-"}</p>
               {/* <p>Loss: {loss ?? "-"} </p>*/}
            </section>

            <section>
                <h5>Image Data</h5> 
                <div className = "image-grid">
                    {data.slice(-20).map((d, i) => (
                    <div key={i}>
                        <img src={d.src} width={40} />
                        <small>{d.label}</small>
                    </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
