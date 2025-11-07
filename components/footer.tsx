import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">CrimsonWings</span>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-300 text-sm">
          <p>© 2025 CrimsonWings. All rights reserved.</p>
          <p className="mt-2">In Partnership with Lagos State Blood Transfusion Services</p>
          <p className="mt-4 font-bold text-base">
            Designed by <span className="font-extrabold">Isaac Kingsley</span> +2348146602816
          </p>
        </div>
      </div>
    </footer>
  )
}
