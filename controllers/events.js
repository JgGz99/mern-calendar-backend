const { response } = require('express')
const Evento = require('../models/Evento')

const obtenerEventos = async (req, res = response) => {

    try {
        const eventos = await Evento.find().populate('user', 'name')

        return res.json({
            ok: true,
            eventos
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: "Ha ocurrido un problema hable con el administrador"
        })

    }
}
const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)
    try {
        evento.user = req.uid
        const eventoGuardado = await evento.save()
        return res.json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}
const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid
    try {
        const evento = await Evento.findById(eventoId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un elemento con este id"
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio para editar este evento"
            })

        }
        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })

        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error hable con el administrador"
        })
    }


}
const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id
    try {
        const uid = req.uid

        const evento = await Evento.findById(eventoId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un elemento con este id"
            })
        }

        if (evento.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: "No tiene el privilegio de eliminar este elemento"
            })
        }
        await Evento.findByIdAndDelete(eventoId)
        return res.json({
            ok: true,
            msg:"Elemento eliminado"

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Ha ocurrido un error hable con el administrador"
        })
    }

}



module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}