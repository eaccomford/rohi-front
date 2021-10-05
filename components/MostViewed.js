function MostViewed() {
    return (
        <div className="mt-2 bg-gray-100 rounded-2xl">
              <h1 className="p-2 text-xl font-bold">Most Viewed</h1>
              <div className="p-2 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600 active:scale-90 hover:shadow-sm hover:rounded-lg">
                <div className="text-sm rounded">
                  <p className="text-gray-400">Free Food</p>
                  <p className="py-2 text-lg">Food Flood at Tema Street</p>
                  The ROHI Church donated foods and other valuable items to residence of 
                  <p>❤️ 3000</p>
                </div>
              </div>
              <div className="p-2 cursor-pointer hover:bg-gray-200 hover:transition-all hover:duration-600 active:scale-90 hover:shadow-sm hover:rounded-lg">
                <div className="mt-5 text-sm rounded hover:bg-gray-200 hover:transition-all hover:duration-600">
                  <p className="text-gray-400">Hospital Equipment</p>
                  <p className="py-2 text-lg">Another Love Offering at the  Hospital</p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                  <p>❤️ 4400</p>
                </div>
              </div>
            </div>
    )
}

export default MostViewed
