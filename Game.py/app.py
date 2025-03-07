from flask import Flask, request, render_template
from googletrans import Translator

app = Flask(__name__)

def traduire_en_anglais(phrase):
    try:
        # Créez une instance du traducteur
        translator = Translator()

        # Utilisez la méthode translate pour traduire la phrase en anglais
        traduction = translator.translate(phrase, src='fr', dest='en')

        # Renvoyez le texte traduit
        return traduction.text

    except Exception as e:
        return f"Une erreur s'est produite : {str(e)}"

@app.route("/", methods=["GET", "POST"])
def traducteur():
    traduction = ""

    if request.method == "POST":
        phrase_fr = request.form["phrase_fr"]
        traduction = traduire_en_anglais(phrase_fr)

    return render_template("traduction.html", traduction=traduction)

if __name__ == "__main__":
    app.run(debug=True)
