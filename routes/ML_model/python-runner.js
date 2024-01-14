import { PythonShell } from 'python-shell';

async function runPythonScript(scriptName, inputData) {   
    // console.log(JSON.stringify(inputData));
    const options = {
        scriptPath: './routes/ML_model',
        args: [JSON.stringify(inputData)],
    };

    try {
        const results = await PythonShell.run(scriptName, options);
        const parsedResult = JSON.parse(results[0]);
        return parsedResult;
    } catch (error) {
        console.error('Error running Python script:', error);
        throw error;
    }
}

export default runPythonScript;
