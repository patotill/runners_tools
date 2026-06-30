// --- CLASE 1: Interfaz de la Calculadora de Ritmo ---
class InterfazCalculadora {
    constructor() {
        this.formulario = document.getElementById('paceForm');
        this.resultadoDiv = document.getElementById('resultado');
        this.ritmoMostrado = document.getElementById('ritmoMostrado');
        this.selectDistancia = document.getElementById('distancia');
        this.inputDistanciaPersonalizada = document.getElementById('distanciaPersonalizada');
        
        this.vincularEventos();
    }

    vincularEventos() {
        this.formulario.addEventListener('submit', (evento) => this.procesarFormulario(evento));
        this.selectDistancia.addEventListener('change', () => this.manejarCambioSelector());
    }

    manejarCambioSelector() {
        if (this.selectDistancia.value === 'otra') {
            this.inputDistanciaPersonalizada.classList.remove('oculto');
            this.inputDistanciaPersonalizada.required = true;
        } else {
            this.inputDistanciaPersonalizada.classList.add('oculto');
            this.inputDistanciaPersonalizada.required = false;
            this.inputDistanciaPersonalizada.value = '';
        }
    }

    obtenerDatosFormulario() {
        let valorDistancia = this.selectDistancia.value;
        if (valorDistancia === 'otra') {
            valorDistancia = this.inputDistanciaPersonalizada.value;
        }

        return {
            distancia: parseFloat(valorDistancia),
            horas: parseInt(document.getElementById('horas').value) || 0,
            minutos: parseInt(document.getElementById('minutos').value) || 0,
            segundos: parseInt(document.getElementById('segundos').value) || 0
        };
    }

    async procesarFormulario(evento) {
        evento.preventDefault(); 
        const datos = this.obtenerDatosFormulario();

        try {
            const respuesta = await fetch('/api/calcular-ritmo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            this.actualizarVista(resultado.ritmo);
            
        } catch (error) {
            console.error('Error en la petición de ritmo:', error);
        }
    }

    actualizarVista(ritmo) {
        this.ritmoMostrado.innerText = ritmo;
        this.resultadoDiv.classList.remove('oculto');
    }
}


// --- CLASE 2: Interfaz del Predictor 21k ---
class InterfazPredictor21k {
    constructor() {
        this.btnDesplegar = document.getElementById('btnDesplegarPredictor');
        this.seccionPredictor = document.getElementById('seccionPredictor');
        this.formulario = document.getElementById('predictForm');
        this.resultadoDiv = document.getElementById('resultadoPredictor');
        this.prediccionMostrada = document.getElementById('prediccionMostrada');

        this.vincularEventos();
    }

    vincularEventos() {
        this.btnDesplegar.addEventListener('click', () => this.alternarColapsable());
        this.formulario.addEventListener('submit', (evento) => this.procesarFormulario(evento));
    }

    alternarColapsable() {
        this.seccionPredictor.classList.toggle('oculto-colapsable');
        const icono = this.btnDesplegar.querySelector('i');
        if (this.seccionPredictor.classList.contains('oculto-colapsable')) {
            icono.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            icono.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
    }

    async procesarFormulario(evento) {
        evento.preventDefault(); 
        
        const datos = {
            horas: parseInt(document.getElementById('predHoras').value) || 0,
            minutos: parseInt(document.getElementById('predMinutos').value) || 0,
            segundos: parseInt(document.getElementById('predSegundos').value) || 0
        };

        try {
            const respuesta = await fetch('/api/predecir-media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            this.prediccionMostrada.innerText = resultado.prediccion;
            this.resultadoDiv.classList.remove('oculto');
        } catch (error) {
            console.error('Error en la petición de predicción:', error);
        }
    }
}


// --- CLASE 3: Interfaz del Predictor 42k ---
class InterfazPredictor42k {
    constructor() {
        this.btnDesplegar = document.getElementById('btnDesplegarPredictor42');
        this.seccionPredictor = document.getElementById('seccionPredictor42');
        this.formulario = document.getElementById('predict42Form');
        this.resultadoDiv = document.getElementById('resultadoPredictor42');
        this.prediccionMostrada = document.getElementById('prediccionMostrada42');

        this.vincularEventos();
    }

    vincularEventos() {
        this.btnDesplegar.addEventListener('click', () => this.alternarColapsable());
        this.formulario.addEventListener('submit', (evento) => this.procesarFormulario(evento));
    }

    alternarColapsable() {
        this.seccionPredictor.classList.toggle('oculto-colapsable');
        const icono = this.btnDesplegar.querySelector('i');
        if (this.seccionPredictor.classList.contains('oculto-colapsable')) {
            icono.classList.replace('fa-chevron-up', 'fa-chevron-down');
        } else {
            icono.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }
    }

    async procesarFormulario(evento) {
        evento.preventDefault(); 
        
        const datos = {
            horas: parseInt(document.getElementById('pred42Horas').value) || 0,
            minutos: parseInt(document.getElementById('pred42Minutos').value) || 0,
            segundos: parseInt(document.getElementById('pred42Segundos').value) || 0
        };

        try {
            const respuesta = await fetch('/api/predecir-maraton', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await respuesta.json();
            this.prediccionMostrada.innerText = resultado.prediccion;
            this.resultadoDiv.classList.remove('oculto');
        } catch (error) {
            console.error('Error en la petición de predicción:', error);
        }
    }
}


// --- INSTANCIACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    new InterfazCalculadora();
    new InterfazPredictor21k();
    new InterfazPredictor42k();
});