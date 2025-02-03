import { motion } from "framer-motion";

function CharacterScene({ users }) {
  return (
    <div className="relative w-full h-[500px] bg-gray-900 border border-gray-700 rounded-lg p-4 flex flex-wrap justify-center items-center">
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          drag
          dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          className="relative w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer shadow-md"
          style={{
            position: "absolute",
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
          }}
        >
          {user.name.charAt(0)} {/* Mostra a inicial do nome */}
          <span className="absolute top-[-25px] text-sm">{user.name}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default CharacterScene;
