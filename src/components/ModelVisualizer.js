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
    const isLow = typeof confidence ===  "number" && confidence < 0.60;

    const directionLabels = {
        0: "right",
        1: "up",
        2: "left",
        3: "down"
    }

    const displayImages = [...data].reverse();

    
    return(
        <div className ="Visualization">
            <h3>Current Insights</h3>

            <section>
                <p>Prediction: {directionLabels[prediction] ?? "-"}</p>
                <p>Confidence: {confidence !== null && confidence !== undefined ?  (confidence*100).toFixed(2) + "%": "-"}</p>
                {isLow && (
                    <h2 style={{color: "#ff0000"}}> 
                    ⚠ Model is confused. Try collecting more data for this gesture!
                    </h2>
                )} 
                {!isLow && (
                    <h2 style={{color: "#008000"}}> 
                        ✓ Model is stable.
                    </h2>
                )} 

                {/*<p>Confidence: {confidence ? confidence.toFixed(2) : "-"}</p> */}

               {/* <p>Loss: {loss ?? "-"} </p>*/}
            </section>




            <section>
                <h3>Image Data (past twenty images) </h3> 
                <div className = "image-grid">
                    {displayImages.slice(0,20).map((d, i) => (
                    <div key={i}>
                        <img src={d.src} width={40} />
                        <large>{d.label}</large>
                    </div>
                    ))}
                </div>
            </section>
            
        </div>
    )
}
