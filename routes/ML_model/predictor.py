import pickle
import sys
import json


def load_model(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    return model

def predict(model, data):
    # Replace this with your actual prediction logic
    prediction = model.predict([data])
    return prediction.tolist()

if __name__ == '__main__':
    # print("Current working directory:", os.getcwd())
    model_path ='./routes/ML_model/pipe.pkl'
    model = load_model(model_path)

    try:
        input_data_ = json.loads(sys.argv[1])
        a=list(input_data_.values())
        # print(input_data)
    except json.decoder.JSONDecodeError as e:
        print(f"Error decoding JSON input: {e}")
        sys.exit(1)
    results = {'prediction': predict(model, a)}
    print(json.dumps(results))
