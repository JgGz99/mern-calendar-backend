const { Router } = require('express')
const { validarJWT } = require('../middlewares/validar-token')
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')
const router = Router()

// Se requiere token para cada peticion
router.use(validarJWT)
///obtener eventos
router.get('/', obtenerEventos)

router.post('/', [
    check('title', "El titulo es obligatorio").not().isEmpty(),
    check('start', "Fecha de inicio es obligatoria").custom(isDate),
    check('end', "Fecha final es obligatoria").custom(isDate),
    validarCampos
], crearEvento)

router.put('/:id',
    [check('title', "El titulo es obligatorio").not().isEmpty(),
    check('start', "Fecha de inicio es obligatoria").custom(isDate),
    check('end', "Fecha final es obligatoria").custom(isDate),
    ]
    , actualizarEvento)

router.delete('/:id', eliminarEvento)



module.exports = router