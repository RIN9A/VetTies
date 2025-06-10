import Image from "next/image";
import CatImage from "../_image/CatImage";
import DogImage from "../_image/DogImage";

export default function PetProfile({pet}) {
  return (
    <div className="flex flex-col justify-start items-center mt-7 gap-2 text-left">
        <div className="w-44 h-44  ">
            {pet.species === "Кошка" || pet.species === "Кот" ? <CatImage /> : <DogImage />}
        </div>

        <div className="w-80 flex justify-start gap-4">
        <p className="text-sm text-zinc-500 uppercase">ID : {pet.id.slice(0,10)}</p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Имя :
            </p>
            <p>
                {pet.name}
            </p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Вид :
            </p>
            <p>
                {pet.species}
            </p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Порода :
            </p>
            <p>
                {pet.breed}
            </p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Дата рождения :
            </p>
            <p>
                {pet.dateOfBirth.split('-').reverse().join(".")}
            </p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Пол :
            </p>
            <p>
                {pet.gender}
            </p>
        </div>
        <div className="flex justify-start gap-4 min-w-80">
            <p className="font-bold text-[#240066]">
                Вес :
            </p>
            <p>
                {pet.weight + " " + "кг"} 
            </p>
        </div>
    </div>
  )
}
