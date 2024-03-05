import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POLL } from "../../utils/mutations";

import Auth from "../../utils/auth";

export default function CreatePoll () {
    const [formState, setFormState] = useState({
        header: "",
        description: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        choice5: "",
        choice6: "",
        choice7: "",
        choice8: "",
    });
    const [createPoll, {error, data}] = useMutation(CREATE_POLL);

    //Formats the formState for Mutation
    const formatMutation = (formState) => {

        //return formState Starter
        const mutationFormat = {
            header: formState.header,
            description: formState.description,
        }
        
        //Cleans up choices array from original formState
        //Takes populated choices and pushes to new array
        const choices = [];
        for (var key in formState) {
            if (formState.hasOwnProperty(key)) {
                if(key.includes('choice') && formState[key] !== ''){
                    choices.push(formState[key]);
                } 
            }
        }
        //append choices array to mutationFormat
        mutationFormat['choices'] = choices;

        //push creator to mutationFormat
        //mutationFormat['creator'] = Auth.getProfile().authenticatedPerson.username;

        return mutationFormat;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const createPollInput = formatMutation(formState);
        console.log(createPollInput);
        
        
        try {
            const { data } = await createPoll({
                variables: { input: createPollInput },
            });
        } catch (e) {
            console.error(e);
        }

        /*
        //clear form data
        setFormState({
            header: "",
            description: "",
            choice1: "",
            choice2: "",
            choice3: "",
            choice4: "",
            choice5: "",
            choice6: "",
            choice7: "",
            choice8: "",
        });*/
    }

    return (

        <main>
            {Auth.loggedIn() ? (
                <>
                    <div className="container align-self-center w-75" style={{ color: "white" }}>
                    <h2>Create a Poll</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group row p-2">
                            <label className="col-sm-2 col-form-label">Title: </label>
                            <div className="col-sm-8">
                                <input 
                                    placeholder="Poll Title"
                                    type="text" 
                                    id="titleInput" 
                                    className="form-control" 
                                    name="header"
                                    value={formState.header}
                                    onChange={handleChange}
                                    required>                                   
                                </input>
                            </div>
                        </div>
                        <div className="form-group row p-2">
                            <label className="col-sm-2 col-form-label">Description: </label>
                            <div className="col-sm-8">
                                <input
                                    placeholder="Brief poll description (Optional)" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control" 
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}>                                    
                                </input>
                            </div>
                        </div>
                        <div className="form-group row p-2">
                            <label className="col-sm-2 col-form-label">{`Choices: Must be between 2 and 8`}</label>
                            <div className="col-sm-8">
                                <input
                                    placeholder="Choice 1" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice1"
                                    value={formState.choice1}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 2" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice2"
                                    value={formState.choice2}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 3" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice3"
                                    value={formState.choice3}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 4" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice4"
                                    value={formState.choice4}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 5" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice5"
                                    value={formState.choice5}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 6" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice6"
                                    value={formState.choice6}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 7" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice7"
                                    value={formState.choice7}
                                    onChange={handleChange}>                                    
                                </input>
                                <input
                                    placeholder="Choice 8" 
                                    type="text" 
                                    id="descriptionInput" 
                                    className="form-control mb-2" 
                                    name="choice8"
                                    value={formState.choice8}
                                    onChange={handleChange}>                                    
                                </input>
                            </div>
                        </div>
                        <button className="btn btn-block btn-lg btn-primary" type="submit">Create Poll</button>
                    </form>
                    </div>
                </>
            ) : (
                <>
                    <h2>Login to Create a Poll</h2>
                </>
            )}
        </main>

    );
}