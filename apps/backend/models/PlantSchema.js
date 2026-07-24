import mongoose from 'mongoose'

// Sub-esquema para los comentarios
const commentSchema = new mongoose.Schema({
    id: String,
    date: String,
    text: String
}, { _id: false }) // _id: false evita que Mongoose le genere un _id a cada comentario individual

// Sub-esquema para tratamientos
const treatmentSchema = new mongoose.Schema({
    frequencyDays: Number,
    treatmentInfo: String,
    treatmentRecord: [String]
}, { _id: false })

// Sub-esquema para riego
const wateringSchema = new mongoose.Schema({
    frequencyDays: Number,
    wateringInfo: String,
    waterRecord: [String]
}, { _id: false })

// Sub-esquema para fertilización
const fertilizationSchema = new mongoose.Schema({
    required: Boolean,
    frequencyDays: Number,
    fertilizationInfo: String,
    fertilizerRecord: [String]
}, { _id: false })

// Sub-esquema para pulverización
const mistingSchema = new mongoose.Schema({
    required: Boolean,
    frequencyDays: Number
}, { _id: false })

// --- ESQUEMA PRINCIPAL DE LA PLANTA ---
const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    imageUrls: [String],
    acquisition: String,
    sick: { type: Boolean, default: false },
    treatment: treatmentSchema,
    notes: String,
    comments: [commentSchema],
    watering: wateringSchema,
    lightInfo: String,
    fertilization: fertilizationSchema,
    misting: mistingSchema
}, {
    // Añade automáticamente createdAt y updatedAt en MongoDB
    timestamps: true,
    toJSON: { virtuals: true }
})

export const Plant = mongoose.model('Plant', plantSchema)