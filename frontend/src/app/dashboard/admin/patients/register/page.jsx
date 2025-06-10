'use client'
import React, { useState } from 'react'
import { createPet, createUser } from '../../../../../utils/postData'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'client',
    // specialization: '',
  })

  const [pets, setPets] = useState([
    {
      name: '',
      species: '',
      breed: '',
      dateOfBirth: '',
      gender: '',
      weight: '',
    },
  ])

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const roles = [
    { label: 'Клиент', value: 'client' },

  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePetChange = (index, e) => {
    const updatedPets = [...pets]
    updatedPets[index][e.target.name] = e.target.value
    setPets(updatedPets)
  }

  const addPet = () => {
    setPets([...pets, {
      name: '',
      species: '',
      breed: '',
      dateOfBirth: '',
      gender: '',
      weight: '',
    }])
  }

  const removePet = (index) => {
    setPets(pets.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    try {
      // 1. Регистрация пользователя
      const registerResponse = await createUser ({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        role: "client",
      }, true, false, false)

      const userId = registerResponse;
      console.log(userId)

      // 2. Если персонал — создать Vet


      // if (formData.role === 'vet') {
      //   await axios.post('http://localhost:8080/vets', {
      //     userId,
      //     specialization: formData.specialization,
      //   })
      // }

      // 3. Если клиент — создать питомцев
      if (formData.role === 'client') {
        for (const pet of pets) {

          await createPet({name: pet.name,
            species: pet.species,
            breed: pet.breed,
            dateOfBirth: pet.dateOfBirth,
            gender: pet.gender,
            weight: parseFloat(pet.weight),
            owner: { ...userId },}, false, true, false)
        }
      }

      setMessage('Пользователь успешно зарегистрирован')
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        // specialization: '',
      })
      setPets([
        {
          name: '',
          species: '',
          breed: '',
          dateOfBirth: '',
          gender: '',
          weight: '',
        },
      ])
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className='flex justify-start items-baseline'>
    <Link className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' href={"/dashboard/admin/patients"}>
      <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
        <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
      </svg>
    </Link>
  </div>
    <div className="max-w-3xl md:min-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Регистрация пользователя</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 border rounded px-4 py-2"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 border rounded px-4 py-2"
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Номер телефона"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        />

        {/* <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2"
          required
        >
          <option value="">Выберите роль</option>
          {roles.map((role) => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select> */}

        {/* {formData.role === 'vet' && (
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          >
            <option value="">Выберите специализацию</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        )} */}

        {formData.role === 'client' && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2">Питомцы</h3>
            {pets.map((pet, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 border p-4 mb-2 rounded">
                <input
                  type="text"
                  name="name"
                  placeholder="Кличка"
                  value={pet.name}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="species"
                  placeholder="Вид"
                  value={pet.species}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="breed"
                  placeholder="Порода"
                  value={pet.breed}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={pet.dateOfBirth}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  name="gender"
                  value={pet.gender}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                >
                  <option value="">Пол</option>
                  <option value="M">Мужской</option>
                  <option value="F">Женский</option>
                </select>
                <input
                  type="number"
                  name="weight"
                  placeholder="Вес (кг)"
                  value={pet.weight}
                  onChange={(e) => handlePetChange(index, e)}
                  className="border rounded px-3 py-2"
                  required
                />
                {pets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePet(index)}
                    className="col-span-2 text-red-500 text-sm"
                  >
                    Удалить питомца
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPet}
              className="text-blue-600 hover:underline text-sm"
            >
              + Добавить ещё питомца
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Регистрация...' : 'Зарегистрировать'}
        </button>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
    </>
  )
}
