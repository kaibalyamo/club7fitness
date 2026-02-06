import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Box, Typography } from '@mui/material'
import { X, Send } from 'lucide-react'
import { getImagePath } from '../utils/imagePath'

const personalTrainingOptions = [
  { 
    id: 'strength', 
    label: 'Strength Training', 
    description: 'Build muscle and power',
    details: 'Transform your physique with our comprehensive strength training program. Focus on progressive overload, proper form, and muscle development. Perfect for building lean muscle mass and increasing overall strength.',
    image: '/assets/images/class-1.jpg'
  },
  { 
    id: 'cardio', 
    label: 'Cardio Conditioning', 
    description: 'Improve endurance and heart health',
    details: 'Boost your cardiovascular health with our dynamic cardio conditioning program. Includes running, cycling, rowing, and HIIT sessions designed to improve stamina, burn calories, and enhance heart health.',
    image: '/assets/images/class-2.jpg'
  },
  { 
    id: 'functional', 
    label: 'Functional Fitness', 
    description: 'Real-world movement patterns',
    details: 'Train movements, not just muscles. Our functional fitness program focuses on exercises that mimic daily activities, improving balance, coordination, and overall movement quality. Perfect for injury prevention and enhanced mobility.',
    image: '/assets/images/class-3.jpg'
  },
  { 
    id: 'weightloss', 
    label: 'Weight Loss Program', 
    description: 'Customized fat loss plan',
    details: 'Achieve sustainable weight loss with our personalized program combining effective workouts and nutrition guidance. Our trainers will create a customized plan tailored to your goals, metabolism, and lifestyle for long-term success.',
    image: '/assets/images/class-4.jpg'
  },
  { 
    id: 'bodybuilding', 
    label: 'Bodybuilding', 
    description: 'Competition-ready physique',
    details: 'Take your physique to the next level with our advanced bodybuilding program. Learn proper training splits, nutrition strategies, and posing techniques. Whether you\'re preparing for competition or just want to look your absolute best.',
    image: '/assets/images/about-banner.png'
  },
  { 
    id: 'yoga', 
    label: 'Yoga & Flexibility', 
    description: 'Mind-body connection',
    details: 'Find balance and inner strength through our yoga and flexibility program. Improve flexibility, reduce stress, enhance mindfulness, and build core strength. Suitable for all levels, from beginners to advanced practitioners.',
    image: '/assets/images/class-3.jpg'
  },
  { 
    id: 'hiit', 
    label: 'HIIT Training', 
    description: 'High-intensity interval training',
    details: 'Maximize your results in minimal time with our HIIT training program. High-intensity intervals followed by short recovery periods help you burn more calories, improve cardiovascular fitness, and build endurance faster than traditional workouts.',
    image: '/assets/images/class-4.jpg'
  },
  { 
    id: 'nutrition', 
    label: 'Nutrition Coaching', 
    description: 'Diet and meal planning',
    details: 'Fuel your body for optimal performance with our comprehensive nutrition coaching. Get personalized meal plans, macro calculations, supplement guidance, and ongoing support to help you reach your fitness goals through proper nutrition.',
    image: '/assets/images/about-coach.jpg'
  },
]

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    trainingProgram: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.trainingProgram) {
      newErrors.trainingProgram = 'Please select a training program'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Format WhatsApp message
    const selectedProgram = personalTrainingOptions.find(p => p.id === formData.trainingProgram)
    const whatsappMessage = `*New Enquiry - Club 7 Fitness*

*Name:* ${formData.name}
*Training Program:* ${selectedProgram ? selectedProgram.label : formData.trainingProgram}
${selectedProgram ? `*Program Details:* ${selectedProgram.details}` : ''}
${formData.message ? `*Message:* ${formData.message}` : ''}

_I'm interested in joining Club 7 Fitness!_`

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const phoneNumber = '9170008310868' // WhatsApp number without + or spaces
    
    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      trainingProgram: '',
      message: '',
    })
    
    // Close modal after a short delay
    setTimeout(() => {
      onClose()
    }, 500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-club-charcoal border border-club-blue/30 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.2)',
              }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-club-dark/90 hover:bg-club-dark border border-club-blue/50 hover:border-club-blue rounded-full p-2 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-white group-hover:text-club-blue transition-colors" />
              </motion.button>

              {/* Form Content */}
              <Box sx={{ p: 4 }}>
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6"
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 800,
                      fontFamily: 'Montserrat, sans-serif',
                      mb: 1,
                    }}
                  >
                    Start Your <span style={{ color: '#3b82f6' }}>Journey</span>
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#94a3b8',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Fill in your details and we'll connect you with our team
                  </Typography>
                </motion.div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </motion.div>

                  {/* Training Program Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4"
                  >
                    <FormControl
                      component="fieldset"
                      error={!!errors.trainingProgram}
                      fullWidth
                    >
                      <FormLabel
                        component="legend"
                        sx={{
                          color: '#94a3b8',
                          mb: 2,
                          '&.Mui-focused': {
                            color: '#3b82f6',
                          },
                        }}
                      >
                        Select Training Program <span style={{ color: '#ef4444' }}>*</span>
                      </FormLabel>
                      <RadioGroup
                        name="trainingProgram"
                        value={formData.trainingProgram}
                        onChange={handleChange}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            color: '#ffffff',
                            fontFamily: 'Poppins, sans-serif',
                            width: '100%',
                          },
                          '& .MuiRadio-root': {
                            color: 'rgba(59, 130, 246, 0.5)',
                            '&.Mui-checked': {
                              color: '#3b82f6',
                            },
                          },
                        }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {personalTrainingOptions.map((option) => (
                            <FormControlLabel
                              key={option.id}
                              value={option.id}
                              control={<Radio sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }} />}
                              label={
                                <motion.div
                                  className="relative w-full"
                                  whileHover={{ scale: 1.02 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {/* Image */}
                                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                                    <img
                                      src={getImagePath(option.image)}
                                      alt={option.label}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-2 left-3 right-3">
                                      <div className="font-bold text-white text-lg">{option.label}</div>
                                      <div className="text-xs text-club-steel">{option.description}</div>
                                    </div>
                                  </div>
                                  {/* Details */}
                                  <div className="text-sm text-club-steel leading-relaxed px-1">
                                    {option.details}
                                  </div>
                                </motion.div>
                              }
                              sx={{
                                border: formData.trainingProgram === option.id
                                  ? '2px solid #3b82f6'
                                  : '2px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '12px',
                                p: 2,
                                m: 0,
                                position: 'relative',
                                backgroundColor: formData.trainingProgram === option.id
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(26, 26, 26, 0.5)',
                                '&:hover': {
                                  borderColor: '#3b82f6',
                                  backgroundColor: 'rgba(59, 130, 246, 0.15)',
                                },
                                transition: 'all 0.3s ease',
                              }}
                            />
                          ))}
                        </div>
                      </RadioGroup>
                      {errors.trainingProgram && (
                        <Typography
                          variant="caption"
                          sx={{ color: '#ef4444', mt: 1, display: 'block' }}
                        >
                          {errors.trainingProgram}
                        </Typography>
                      )}
                    </FormControl>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <TextField
                      fullWidth
                      label="Additional Message (Optional)"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={3}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: '#ffffff',
                          '& fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(59, 130, 246, 0.5)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#3b82f6',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#94a3b8',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#3b82f6',
                        },
                      }}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      startIcon={<Send size={20} />}
                      sx={{
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                          boxShadow: '0 15px 50px rgba(59, 130, 246, 0.6)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Send Enquiry via WhatsApp
                    </Button>
                  </motion.div>
                </form>
              </Box>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EnquiryForm

