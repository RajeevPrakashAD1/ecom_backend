// Define the categories and subcategories with descriptions and relevant images
const categories = [
	{
		name: 'Diabetes',
		description: 'Products suitable for individuals with diabetes',
		image: 'diabetes.jpg',
		subcategories: [
			{
				name: 'Low Carb Atta',
				description: 'Atta with low carbohydrate content',
				image: 'low_carb_atta.jpg'
			},
			{
				name: 'Low Carb Snacks',
				description: 'Snacks with low carbohydrate content',
				image: 'low_carb_snacks.jpg'
			},
			{
				name: 'Dried Fruits/Vegetables',
				description: 'Dried fruits and vegetables suitable for diabetics',
				image: 'dried_fruits_vegetables.jpg'
			},
			{
				name: 'Low GI Food',
				description: 'Food with low glycemic index for better blood sugar control',
				image: 'low_gi_food.jpg'
			},
			{
				name: 'Diabetic Rice or Substitutes',
				description: 'Rice or alternative options suitable for diabetics',
				image: 'diabetic_rice_substitutes.jpg'
			},
			{
				name: 'Sugar Substitutes',
				description: 'Substitutes for sugar in diabetic-friendly products',
				image: 'sugar_substitutes.jpg'
			}
		]
	},
	{
		name: 'Nutrition Products',
		description: 'Nutritional products for overall health',
		image: 'nutrition_products.jpg',
		subcategories: [
			{
				name: 'Multivitamins',
				description: 'Supplements with a combination of essential vitamins',
				image: 'multivitamins.jpg'
			},
			{
				name: 'Protein Powders',
				description: 'Powders rich in protein for muscle recovery and growth',
				image: 'protein_powders.jpg'
			},
			{
				name: 'Vitamins and Protein Deficiency',
				description: 'Products addressing deficiencies in vitamins and proteins',
				image: 'vitamins_protein_deficiency.jpg'
			}
		]
	},
	{
		name: 'Herbs/Spices',
		description: 'Herbs and spices for flavor and health benefits',
		image: 'herbs_spices.jpg',
		subcategories: [
			{
				name: 'Ayurvedic Revitalizers and Medicines',
				description: 'Ayurvedic products for vitality and wellness',
				image: 'ayurvedic_revitalizers_medicines.jpg'
			}
		]
	},
	{
		name: 'Beverages',
		description: 'A variety of beverages for different preferences',
		image: 'beverages.jpg',
		subcategories: [
			{
				name: 'Cold Pressed Oil',
				description: 'Oil extracted using cold pressing method',
				image: 'cold_pressed_oil.jpg'
			}
		]
	},
	{
		name: 'Geriatrics',
		description: 'Products catering to the specific needs of the elderly',
		image: 'geriatrics.jpg',
		subcategories: [
			{
				name: 'Senile Debility',
				description: 'Products addressing age-related decline in physical and mental abilities',
				image: 'senile_debility.jpg'
			}
		]
	},
	{
		name: 'Mother and Child',
		description: 'Products for maternal health and child development',
		image: 'mother_child.jpg',
		subcategories: [
			{
				name: 'Infertility Planning to Conceive',
				description: 'Products to support fertility and conception',
				image: 'infertility_planning_to_conceive.jpg'
			}
			// Add other subcategories for Mother and Child
		]
	}
	// Add other categories...
];

// Export the functions
module.exports = {
	getCategories: (req, res) => {
		res.json(categories);
	},
	getSubcategories: (req, res) => {
		const category = req.params.category;
		const categoryData = categories.find((c) => c.name === category);
		const subcategoryList = categoryData ? categoryData.subcategories || [] : [];
		res.json(subcategoryList);
	}
};
