from flask import Flask, request, render_template, make_response, redirect, url_for
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    # Obtener las cookies de preferencias del usuario (tipo de letra y color de font)
    font_type = request.cookies.get('font_type', 'Arial')
    font_color = request.cookies.get('font_color', '#000000')
    
    # Obtener los enlaces visitados
    visited_links = request.cookies.get('visited_links', '').split(',')

    return render_template('index.html', font_type=font_type, font_color=font_color, visited_links=visited_links)


@app.route('/set_preferences', methods=['POST'])
def set_preferences():
    # Obtener preferencias del formulario
    font_type = request.form['font_type']
    font_color = request.form['font_color']

    # Crear una respuesta y establecer cookies
    response = make_response(redirect(url_for('index')))
    response.set_cookie('font_type', font_type, max_age=20)  # Cookie válida por 1 año
    response.set_cookie('font_color', font_color, max_age=20)

    return response


@app.route('/visit/<path:link>')
def visit_link(link):
    # Obtener los enlaces visitados actuales desde la cookie
    visited_links = request.cookies.get('visited_links', '')

    # Si el enlace no está en la lista, agregarlo
    if link not in visited_links.split(','):
        visited_links += ',' + link if visited_links else link

    # Crear una respuesta redirigiendo al enlace original
    response = make_response(redirect(link))

    # Guardar los enlaces visitados actualizados en la cookie
    response.set_cookie('visited_links', visited_links, max_age=6)

    return response
if __name__ == '__main__':
    app.run(debug=True)
