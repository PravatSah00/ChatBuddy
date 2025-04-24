<?php

/**
 * Fired during plugin activation
 *
 * @link       https => //http => //@wiiBeThere
 * @since      1.0.0
 *
 * @package    Chatbot
 * @subpackage Chatbot/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Chatbot
 * @subpackage Chatbot/includes
 * @author     Pravat Sahoo <pravats459@gmail.com>
 */
class Chatbot_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		
		// Check Decision Graph
		$decision_graph = get_option( '_decision_graph',  null );

		// Insert Default decision graph
		if ( empty( $decision_graph ) ) {
			update_option( '_decision_graph', [
				'nodes' => [
					[
						"id"   => "3288bceb-625b-40f4-a3cb-8fdfa35de670",
						"type" => "decision",
            			"data" => [
							"key"      => "root",
							"label"    => "#####",
                			"message"  => "Select one of the option bellow or type your query?",
						],
						"position" => [
							"x" => 464,
							"y" => 76
						],
						"measured" => [
							"width"  => 193,
							"height" => 51
						],
					],
					[
						"id"   => "5790bb4a-0a97-4e2e-8292-f0f8f6e3994e",
            			"type" => "decision",
						"data" => [
							"key"     => "product_info",
							"label"   => "Product Information",
							"message" => "Sure! Please let me know which product you're interested in, and I'll provide all the details you need.",
						],
						"position" => [
							"x" => -480.99999500785117,
							"y" => 304.99999822313345
						],
						"measured" => [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id" 	=>  "f56a89b3-3ce9-4f09-a65c-c4d058df2e63",
						"type"  =>  "decision",
						"data"  =>  [
							"key"     =>  "account_issues",
							"label"   => "Accunt Issues",
							"message" =>  "I'm here to help with your account issues. Could you please describe the problem you're experiencing?",
						],
						"position" => [
							"x" =>  151.00000456908526,
							"y" =>  298.9999981385208
						],
						"measured" => [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "3460d66b-225d-4908-af0e-d2bb5a222e30",
						"type" =>  "decision",
						"data" => [
							"key" 	  =>  "contact_support",
							"label"   =>  "Talk to Support",
							"message" =>  "Please choose one of the following options",
						],
						"position" => [
							"x" =>  739.0000036383458,
							"y" =>  281.9999981385207
						],
						"measured" => [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "5ad5aa4f-8e01-4cb8-b86d-754764ced687",
						"type" =>  "redirect",
						"data" =>  [
							"message" =>  "Go To Google",
							"label"   =>  "Go To Google",
							"url"     =>  "https://google.com"
						],
						"position" => [
							"x" =>  1137.2500027076062,
							"y" =>  278.99999771545737
						],
						"measured" => [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "6cad6b33-94c1-45ac-83a1-a94ed194fa9d",
						"type" =>  "action",
						"data" =>  [
							"label"   =>  "Quick Support",
							"message" =>  "Enter Query, Name, Phone",
							"key"	  =>  "support-1",
							"inputs"  =>  "Query | Name | Phone"
						],
						"position" =>  [
							"x" =>  621.5890525185059,
							"y" =>  419.9849845390762
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "831df988-52b5-4bb4-ba1a-4a48c8a8d9ce",
						"type" =>  "action",
						"data" =>  [
							"label"   =>  "Customer Care",
							"message" =>  "Enter Name, Phone",
							"key"     =>  "support-2",
							"inputs"  =>  "Name | Phone"
						],
						"position" =>  [
							"x" =>  854.7133954075763,
							"y" =>  419.98498453907615
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "0afd53b1-c63f-4941-bb18-a6ccb63a2f64",
						"type" =>  "message",
						"data" =>  [
							"key" 	  =>  "product-b",
							"label"   =>  "Product B",
							"message" =>  "Product B Information | Product B Information",
						],
						"position" =>  [
							"x" =>  -479.22329217892764,
							"y" =>  424.33458883649183
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "2f935f6c-a886-43d3-acdf-67450806f83c",
						"type" =>  "message",
						"data" =>  [
							"label"   =>  "Product C",
							"message" =>  "Product C information | Product C Information",
							"key"     =>  "product-c"
						],
						"position" =>  [
							"x" =>  -258.57454284373375,
							"y" =>  422.7471877621379
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "8a812d2e-7737-49c0-918f-04412c1707b9",
						"type" =>  "message",
						"data" =>  [
							"label"   =>  "Product A",
							"message" =>  "Product A Information | Product A Information",
							"key"     =>  "product-a"
						],
						"position" =>  [
							"x" =>  -700.6342447371832,
							"y" =>  426.33458883649195
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "c7a312ce-4e27-43ed-bc43-7765fbdca268",
						"type" =>  "action",
						"data" =>  [
							"label"   =>  "Update Email",
							"message" =>  "Enter new email address",
							"key"     =>  "update_email",
							"inputs"  =>  "New Email"
						],
						"position" =>  [
							"x" =>  257.22691285249743,
							"y" =>  417.67378563073095
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
					[
						"id"   =>  "eebdd9d2-7319-429a-9d24-913405a1cca6",
						"type" =>  "action",
						"data" =>  [
							"label"   =>  "OTP",
							"message" =>  "Enter OTP and New Password",
							"key"     =>  "OTP",
							"inputs"  =>  "OTP | New Password"
						],
						"position" =>  [
							"x" =>  37.11345896462956,
							"y" =>  579.285045727722
						],
						"measured" =>  [
							"width"  =>  193,
							"height" =>  51
						],
					],
				],
				'edges' => [
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3288bceb-625b-40f4-a3cb-8fdfa35de670",
						"target" =>  "5790bb4a-0a97-4e2e-8292-f0f8f6e3994e",
						"id"     =>  "xy-edge__3288bceb-625b-40f4-a3cb-8fdfa35de670-5790bb4a-0a97-4e2e-8292-f0f8f6e3994e"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3288bceb-625b-40f4-a3cb-8fdfa35de670",
						"target" =>  "f56a89b3-3ce9-4f09-a65c-c4d058df2e63",
						"id"     =>  "xy-edge__3288bceb-625b-40f4-a3cb-8fdfa35de670-f56a89b3-3ce9-4f09-a65c-c4d058df2e63"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3288bceb-625b-40f4-a3cb-8fdfa35de670",
						"target" =>  "3460d66b-225d-4908-af0e-d2bb5a222e30",
						"id"     =>  "xy-edge__3288bceb-625b-40f4-a3cb-8fdfa35de670-3460d66b-225d-4908-af0e-d2bb5a222e30"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3288bceb-625b-40f4-a3cb-8fdfa35de670",
						"target" =>  "5ad5aa4f-8e01-4cb8-b86d-754764ced687",
						"id"     =>  "xy-edge__3288bceb-625b-40f4-a3cb-8fdfa35de670-5ad5aa4f-8e01-4cb8-b86d-754764ced687"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3460d66b-225d-4908-af0e-d2bb5a222e30",
						"target" =>  "6cad6b33-94c1-45ac-83a1-a94ed194fa9d",
						"id"     =>  "xy-edge__3460d66b-225d-4908-af0e-d2bb5a222e30-6cad6b33-94c1-45ac-83a1-a94ed194fa9d"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "3460d66b-225d-4908-af0e-d2bb5a222e30",
						"target" =>  "831df988-52b5-4bb4-ba1a-4a48c8a8d9ce",
						"id"     =>  "xy-edge__3460d66b-225d-4908-af0e-d2bb5a222e30-831df988-52b5-4bb4-ba1a-4a48c8a8d9ce"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "5790bb4a-0a97-4e2e-8292-f0f8f6e3994e",
						"target" =>  "8a812d2e-7737-49c0-918f-04412c1707b9",
						"id"     =>  "xy-edge__5790bb4a-0a97-4e2e-8292-f0f8f6e3994e-8a812d2e-7737-49c0-918f-04412c1707b9"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "5790bb4a-0a97-4e2e-8292-f0f8f6e3994e",
						"target" =>  "0afd53b1-c63f-4941-bb18-a6ccb63a2f64",
						"id"     =>  "xy-edge__5790bb4a-0a97-4e2e-8292-f0f8f6e3994e-0afd53b1-c63f-4941-bb18-a6ccb63a2f64"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "5790bb4a-0a97-4e2e-8292-f0f8f6e3994e",
						"target" =>  "2f935f6c-a886-43d3-acdf-67450806f83c",
						"id"     =>  "xy-edge__5790bb4a-0a97-4e2e-8292-f0f8f6e3994e-2f935f6c-a886-43d3-acdf-67450806f83c"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "f56a89b3-3ce9-4f09-a65c-c4d058df2e63",
						"target" =>  "eebdd9d2-7319-429a-9d24-913405a1cca6",
						"id"     =>  "xy-edge__f56a89b3-3ce9-4f09-a65c-c4d058df2e63-eebdd9d2-7319-429a-9d24-913405a1cca6"
					],
					[
						"type"  =>  "default",
						"style" =>  [
							"stroke"      =>  "#007BFF",
							"strokeWidth" =>  1.2
						],
						"markerEnd" =>  [
							"type"  =>  "arrowclosed",
							"color" =>  "#007BFF"
						],
						"source" =>  "f56a89b3-3ce9-4f09-a65c-c4d058df2e63",
						"target" =>  "c7a312ce-4e27-43ed-bc43-7765fbdca268",
						"id"     =>  "xy-edge__f56a89b3-3ce9-4f09-a65c-c4d058df2e63-c7a312ce-4e27-43ed-bc43-7765fbdca268"
					],
				],
			]);
		}

		// Check Smart Answer
		$smart_answer = get_option( '_smart_answer', null );

		// Insert default Smart Answer
		if ( ! $smart_answer ) {
			update_option( '_smart_answer', [
				[
					"id"		=> "76984b85-f367-42b2-91bc-6e1f97c5aac7",
					"question"  => "Hi | Hello",
					"answer"    => " Hello! How can I help you today?"
				],
				[
					"id"		=> "c7091d0a-cbb2-48d2-96ae-ab39a4c821a1",
					"question"  => "Bye | Goodbye",
					"answer"	=> "Goodbye! Have a great day"
				],
				[
					"id"	    => "b3bb91fd-7ca8-4a01-87f7-49f8f0619c28",
					"question"  => "Talk to you later!",
					"answer"    => "Looking forward to it!"
				],
				[
					"id"	    => "8a2886ef-e433-4d34-b59a-844dd2824d23",
					"question"	=> "What can you do?",
					"answer"	=> "I can help you with general questions, Just ask!"
				]
			]);
		}
	}
}
