export const adaptVet = (vet) => ({
    id: vet.id,
    fullName: `${vet.user.lastName} ${vet.user.firstName}`,
  });
  
  export const adaptPet = (pet) => ({
    id: pet.id,
    label: `${pet.name} (${pet.species})`,
  });
  
  export const adaptClient = (client) => ({
    id: client.id,
    name: `${client.lastName} ${client.firstName}`,
  });

  