# 🏃‍♂️ Runner's Tools

Una aplicación web full-stack diseñada para corredores que buscan precisión y planificación. Esta herramienta permite calcular ritmos de carrera y predecir tiempos finales para medias maratones y maratones completas utilizando fórmulas deportivas estándar.

El proyecto está construido aplicando los principios de la Programación Orientada a Objetos (POO), garantizando un código modular, escalable y mantenible.

## ✨ Características Principales

* **Calculadora de Ritmo:** Obtén el ritmo exacto (min/km) para distancias oficiales o personalizadas.
* **Predictor de Media Maratón (21k):** Estima tu marca en 21km basada en tu tiempo actual en 10k.
* **Predictor de Maratón (42k):** Estima tu marca en 42km basada en tu tiempo actual en 21k.
* **Interfaz Profesional:** Panel de control de 3 columnas con diseño oscuro, responsivo y optimizado.
* **Datos Inspiradores:** Visualización de récords mundiales (WR) vigentes para las distancias de 21k y 42k.

## 🛠️ Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), FontAwesome (Iconos).
* **Backend:** Node.js, Express.js.
* **Arquitectura:** Estructura modular orientada a objetos.

## 📂 Estructura del Proyecto

```text
calculadora-ritmo/
├── public/                 
│   ├── index.html          # Estructura principal (Layout de 3 columnas)
│   ├── style.css           # Estilos, efectos y responsividad
│   ├── script.js           # Lógica cliente (POO por secciones)
│   └── Pistagemini.png     # Fondo de pantalla
├── server.js               # Backend con endpoints para cada cálculo
├── package.json            # Dependencias y scripts
└── README.md               # Documentación


- Idea y diseño del proyecto por Patricio Hernán Till