// import needed atoms

// format graph so it doesn't wreck the already cluttered UI

// make it so it updates with each image and shows the confidence score clearly

import {useAtom} from "jotai";
import {imgSrcArrAtom, predictionAtom, probabilitiesAtom, confidenceAtom, classIdAtom} from "../GlobalState";

export default function ModelVisualizer(){
    const [data] = useAtom(imgSrcArrAtom);
    const [prediction] = useAtom(predictionAtom);
    const [probabilities] = useAtom(probabilitiesAtom);
    const [confidence] = useAtom(confidenceAtom);
    const [classId] = useAtom(classIdAtom);
    const isLow = typeof confidence ===  "number" && confidence < 0.60;

    // for UI
    const directionLabels = {
        0: "right",
        1: "up",
        2: "left",
        3: "down"
    }
    const directionArrows = {
        0: "→",
        1: "↑",
        2: "←",
        3: "↓"
    }
    const sampleCount = {
        right: 0,
        up: 0,
        left: 0,
        down: 0,
    }

    data.forEach(d => {
        if (sampleCount[d.label] !== undefined){
            sampleCount[d.label]++;
        }
    })

    // reverse so it shows images by newest
    const displayImages = [...data].reverse();

    let secondBest = null; 

    // takes the second best guess and its confidence score
    if (Array.isArray(probabilities) && probabilities.length > 1 && prediction != null){
        secondBest = probabilities.map((p,i) => ({prob: p, id: i }))
        .filter(item => item.id !== classId)
        .sort((a,b) => b.prob - a.prob)[0];        
       
    }
    



    
    return(
        <div className ="Visualization">
            <h3>Current Insights</h3>

            <section>
                <p>Prediction: {prediction != null ? directionLabels[prediction] + " " + directionArrows[prediction] : "-"}</p>
                <p>Confidence: {confidence !== null && confidence !== undefined ?  (confidence*100).toFixed(2) + "%": "-"}</p>
                <p>Second guess: {secondBest ? directionLabels[secondBest.id] + "  " + directionArrows[secondBest.id] + " " + (secondBest.prob*100).toFixed(2) + "%": "-"}</p>
                {isLow && (
                    <h2 style={{color: "#ff0000"}}> 
                    ⚠ Model has low confidence. Try collecting more data for this gesture!
                    </h2>
                )} 
                {!isLow && (
                    <h2 style={{color: "#008000"}}> 
                        ✓ Model is stable.
                    </h2>
                )}
            </section>
            <section>
                <h3>Training Samples</h3>
                <ul>
                <li>Up: {sampleCount.up}</li>
                <li>Down: {sampleCount.down}</li>
                <li>Left: {sampleCount.left}</li>
                <li>Right: {sampleCount.right}</li>
                </ul>

            </section>




            <section>
                <h3>Image Data (past twenty images) </h3> 
                <div className = "image-grid">
                    {displayImages.slice(0,20).map((d, i) => (
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
