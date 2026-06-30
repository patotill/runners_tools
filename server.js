const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// --- CLASE 1: Calculadora de Ritmo ---
class CalculadoraRitmo {
    constructor(distancia, horas, minutos, segundos) {
        this.distancia = distancia;
        this.tiempoTotalMinutos = (horas * 60) + minutos + (segundos / 60);
    }

    obtenerRitmoFormateado() {
        const ritmoDecimal = this.tiempoTotalMinutos / this.distancia;
        let ritmoMinutos = Math.floor(ritmoDecimal);
        let ritmoSegundos = Math.round((ritmoDecimal - ritmoMinutos) * 60);

        if (ritmoSegundos === 60) {
            ritmoMinutos++;
            ritmoSegundos = 0;
        }
        const segundosFormateados = ritmoSegundos < 10 ? `0${ritmoSegundos}` : ritmoSegundos;
        return `${ritmoMinutos}:${segundosFormateados} min/km`;
    }
}

// --- CLASE 2: Predictor de Media Maratón (21k) ---
class PredictorMediaMaraton {
    constructor(horas, minutos, segundos) {
        this.tiempoTotalSegundos = (horas * 3600) + (minutos * 60) + segundos;
    }
    calcularPrediccion() {
        const prediccionSegundos = this.tiempoTotalSegundos * 2.223;
        return this.formatearTiempo(prediccionSegundos);
    }
    formatearTiempo(totalSegundos) {
        let horas = Math.floor(totalSegundos / 3600);
        let restoSegundos = totalSegundos % 3600;
        let minutos = Math.floor(restoSegundos / 60);
        let segundos = Math.round(restoSegundos % 60);

        if (segundos === 60) { minutos++; segundos = 0; }
        if (minutos === 60) { horas++; minutos = 0; }

        const hForm = horas > 0 ? `${horas}h ` : '';
        const mForm = minutos < 10 && horas > 0 ? `0${minutos}m ` : `${minutos}m `;
        const sForm = segundos < 10 ? `0${segundos}s` : `${segundos}s`;
        return `${hForm}${mForm}${sForm}`;
    }
}

// --- CLASE 3: Predictor de Maratón (42k) ---
class PredictorMaraton {
    constructor(horas, minutos, segundos) {
        this.tiempoTotalSegundos = (horas * 3600) + (minutos * 60) + segundos;
    }
    calcularPrediccion() {
        const prediccionSegundos = this.tiempoTotalSegundos * 2.1; // Tu multiplicador
        return this.formatearTiempo(prediccionSegundos);
    }
    formatearTiempo(totalSegundos) {
        let horas = Math.floor(totalSegundos / 3600);
        let restoSegundos = totalSegundos % 3600;
        let minutos = Math.floor(restoSegundos / 60);
        let segundos = Math.round(restoSegundos % 60);

        if (segundos === 60) { minutos++; segundos = 0; }
        if (minutos === 60) { horas++; minutos = 0; }

        const hForm = horas > 0 ? `${horas}h ` : '';
        const mForm = minutos < 10 && horas > 0 ? `0${minutos}m ` : `${minutos}m `;
        const sForm = segundos < 10 ? `0${segundos}s` : `${segundos}s`;
        return `${hForm}${mForm}${sForm}`;
    }
}

// --- MIDDLEWARES ---
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS ---
app.post('/api/calcular-ritmo', (req, res) => {
    const { distancia, horas, minutos, segundos } = req.body;
    const calculadora = new CalculadoraRitmo(distancia, horas, minutos, segundos);
    res.json({ ritmo: calculadora.obtenerRitmoFormateado() });
});

app.post('/api/predecir-media', (req, res) => {
    const { horas, minutos, segundos } = req.body;
    const predictor = new PredictorMediaMaraton(horas, minutos, segundos);
    res.json({ prediccion: predictor.calcularPrediccion() });
});

app.post('/api/predecir-maraton', (req, res) => {
    const { horas, minutos, segundos } = req.body;
    const predictor = new PredictorMaraton(horas, minutos, segundos);
    res.json({ prediccion: predictor.calcularPrediccion() });
});

// --- INICIO ---
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});