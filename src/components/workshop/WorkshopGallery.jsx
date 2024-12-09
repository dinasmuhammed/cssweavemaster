import { motion } from 'framer-motion';

const workshopImages = [
  "https://i.ibb.co/0Xx1wxn/ba19277a-ac85-4a52-9127-09a7740bd8ed.jpg",
  "https://i.ibb.co/WzCCtNC/7afa2c62-e1cb-4250-9c81-597cafc6a977.jpg",
  "https://i.ibb.co/SNhC0ts/6c4e8a57-276d-4b27-8bcb-61b720c781e9.jpg",
  "https://i.ibb.co/r3SqJdP/072a2867-34cf-4288-aeac-4adb7509b17e.jpg",
  "https://i.ibb.co/dWn0vvS/image.png",
];

const WorkshopGallery = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-16">
      {workshopImages.map((image, index) => (
        <motion.div
          key={index}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={`Workshop image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
};

export default WorkshopGallery;