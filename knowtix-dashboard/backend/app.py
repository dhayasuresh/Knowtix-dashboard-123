from flask import Flask, request, jsonify
import subprocess, json
import os

app = Flask(__name__)

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        question = data.get("question", "")
        prompt = f"Q: {question}\nGive 4 options (A–D) and mark the correct answer clearly."
        
        # Check if ollama is installed and running
        try:
            result = subprocess.run(
                ["ollama", "run", "llama2", prompt],
                capture_output=True, text=True,
                timeout=30  # Add timeout to prevent hanging
            )
            return jsonify({"response": result.stdout})
        except subprocess.TimeoutExpired:
            return jsonify({"error": "Request to Ollama timed out"}), 500
        except FileNotFoundError:
            return jsonify({"error": "Ollama is not installed or not in PATH"}), 500
        except Exception as e:
            return jsonify({"error": f"Error running Ollama: {str(e)}"}), 500
            
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route("/api/questions", methods=["POST"])
def generate_questions():
    try:
        data = request.get_json()
        category = data.get("category", "")
        difficulty = data.get("difficulty", "medium")
        count = data.get("count", 10)
        
        # Generate mock questions if Ollama is not available
        questions = []
        for i in range(count):
            questions.append({
                "id": i + 1,
                "question": f"Sample question {i + 1} about {category}",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "answer": 0,  # Default to first option
                "explanation": f"Explanation for question {i + 1}",
                "difficulty": difficulty,
                "category": category
            })
        
        return jsonify({"questions": questions})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/run-code", methods=["POST"])
def run_code():
    try:
        data = request.get_json()
        code = data.get("code", "")
        language = data.get("language", "python")
        
        # Basic code execution simulation
        if language == "python":
            try:
                # WARNING: This is unsafe for production
                # Use a proper sandboxed environment
                exec_globals = {}
                exec(code, exec_globals)
                result = str(exec_globals.get('output', 'Code executed successfully'))
            except Exception as e:
                result = f"Error: {str(e)}"
        elif language == "javascript":
            try:
                # WARNING: eval is dangerous
                result = str(eval(code))
            except Exception as e:
                result = f"Error: {str(e)}"
        elif language == "linux":
            try:
                # WARNING: This is dangerous without proper sandboxing
                result = subprocess.run(
                    code.split(), 
                    capture_output=True, 
                    text=True, 
                    timeout=10
                ).stdout
            except Exception as e:
                result = f"Error: {str(e)}"
        else:
            result = f"Language {language} not supported yet"
        
        return jsonify({"output": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)