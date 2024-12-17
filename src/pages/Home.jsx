import React, { useState } from "react";
import Header from "../modules/header";
import Footer from "../modules/footer";
import { getDomains, generateName } from "../config/ApiConfig";



const Home = () => {

    const [displayInput, setDisplayInput] = useState(null)
    const [inputValue, setInputValue] = useState(""); // State to capture input
    const [domains, setDomains] = useState(null);     // State to store API result
    const [generatedName, setGeneratedName] = useState("")

    const handleInputChange = (type) => {
        console.log("type", type);
        setDisplayInput(type);
        setInputValue("")
        setDomains(null);
        setGeneratedName("")
    }
    console.log("display type",displayInput)

    const fetchDomains = async () => {
        if (!inputValue) {
            alert("Please enter a valid input!");
            return;
        }
        try {
            if (displayInput === "Name")
            {
                const response = await getDomains(inputValue);
                console.log("Fetched Response:", response);
                
                // Safely handle response to prevent errors
                if (response && response.alternatives) {
                    setDomains(response.alternatives);
                } else {
                    console.error("Invalid API response structure. 'alternatives' not found.");
                    setDomains([]); // Set to empty array for graceful fallback
                }
            }
            else if (displayInput === "Story")
            {
                const response = await generateName(inputValue);
                console.log("generated response", response);
                if (response && response.domains){
                    setGeneratedName(response.generated_name);
                    setDomains(response.domains)
                }else {
                    console.error("Invalid API response structure.")
                    setDomains([]);
                }

            }

        } catch (error) {
            console.error("Could not call API: ", error);
            setDomains(null);
        }
    };
    
    return (
        <div className="flex flex-col h-screen w-full bg-black text-white">
            <div>
                <Header/>
            </div>
            <div className= {`flex flex-col h-full items-center ${displayInput ? "justify-start": "justify-center"}`}>

                <div className="flex space-x-10 p-5">
                        <div
                            className={`flex flex-col items-center border rounded ${displayInput ? "h-20 w-48 p-3 " : "size-64 p-6"} bg-black text-white hover:bg-white hover:text-black transition-all duration-300 shadow-md`}
                            onClick={() => (handleInputChange("Name"))}
                        >
                            <span className={`${displayInput ? "text-sm" : "text-2xl"}`}>Search with </span>
                            <span className={`animate-pulse ${displayInput ? "text-lg" : "text-4xl mt-10"}`}>Name</span>
                        </div>
                        <div
                            className={`flex flex-col items-center border rounded ${displayInput ? "h-20 w-48 p-3" : "size-64 p-6"} bg-black text-white hover:bg-white hover:text-black transition-all duration-300 shadow-md`}
                            onClick={() => (handleInputChange("Story"))}
                        >
                            <span className={`${displayInput ? "text-sm" : "text-2xl"}`}>Search with </span>
                            <span className={`animate-pulse ${displayInput ? "text-lg" : "text-4xl mt-10"}`}>Story</span>
                        </div>
                    </div>
                {displayInput && (
                    <div className="mt-5 flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            placeholder="Enter your Prompt"
                            onChange={(e) => setInputValue(e.target.value)} // Update inputValue
                            className="border text-black p-2 rounded-l w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button 
                            className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-700"
                            onClick={fetchDomains}
                        >
                            AI Search
                        </button>
                    </div>
                )}
                {domains && (
                    <div className="mt-1 p-5 w-2/3 max-w-2xl bg-white text-black rounded shadow-lg overflow-auto max-h-60">
                        <div>
                            {displayInput === "Name" ? (
                                // Display for "Name" option
                                <>
                                    <p className="font-semibold text-[#FF0000] text-lg">
                                        {inputValue} is taken.
                                    </p>
                                    <p className="mt-2 font-semibold">Available domains:</p>
                                    <ul className="list-disc list-inside mt-2">
                                        {domains.map((domain, index) => (
                                            <li key={index} className="text-gray-700">
                                                {domain}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                // Display for "Story" option
                                <>
                                    <p className="font-semibold text-lg ">
                                        Try using <span className="font-bold text-green-500">{generatedName}</span>
                                    </p>
                                    <p className="mt-2 font-semibold">Also available domains are:</p>
                                    <ul className="list-disc list-inside mt-2">
                                        {domains.map((domain, index) => (
                                            <li key={index} className="text-gray-700">
                                                {domain}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex fixed bottom-0">
                <Footer/>
            </div>
        </div>
    );
}

export default Home;