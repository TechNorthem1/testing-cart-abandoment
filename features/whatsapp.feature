Feature: Iniciar sesion en el sistema de whatsapp

    Scenario: Enviar mensaje de carrito abandonado a usuarios
        Given Ingresar al sistema de whatsapp web "https://web.whatsapp.com/"
        When Escanear el codigo de whatsapp e ingresar al sistema "https://web.whatsapp.com/"
        And Se ingresa a la siguiente url "https://wa.me/+57"
