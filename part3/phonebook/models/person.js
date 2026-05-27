const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name must be at least 3 characters'],
  },

  number: {
    type: String,
    required: [true, 'Phone number is required'],

    validate: {
      validator: function (value) {
        // format: XX-XXXXXXX or XXX-XXXXXXXX
        const phoneRegex = /^\d{2,3}-\d+$/

        if (!phoneRegex.test(value)) {
          return false
        }

        const digitsOnly = value.replace('-', '')

        return digitsOnly.length >= 8
      },

      message:
        'Phone number must be at least 8 digits and formatted like 09-1234556 or 040-22334455',
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
