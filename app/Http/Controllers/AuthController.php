<?php



namespace App\Http\Controllers;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use Validator;

use App\Models\User;

use Firebase\JWT\JWT;

use Illuminate\Http\Request;

use Firebase\JWT\ExpiredException;

use Illuminate\Support\Facades\Hash;

use Laravel\Lumen\Routing\Controller as BaseController;



class AuthController extends BaseController 

{

    /**

     * The request instance.

     *

     * @var \Illuminate\Http\Request

     */

    private $request;



    /**

     * Create a new controller instance.

     *

     * @param  \Illuminate\Http\Request  $request

     * @return void

     */

    public function __construct(Request $request) {

        $this->request = $request;

    }



    /**

     * Create a new token.

     * 

     * @param  \App\User   $user

     * @return string

     */

    protected function jwt(User $user) {

        $payload = [

            'iss' => "lumen-jwt", // Issuer of the token

            'sub' => $user->id, // Subject of the token

            'iat' => time(), // Time when JWT was issued. 

            'exp' => time() + 60*60 // Expiration time

        ];

        

        // As you can see we are passing `JWT_SECRET` as the second parameter that will 

        // be used to decode the token in the future.

        return JWT::encode($payload, env('JWT_SECRET'));

    } 



    /**

     * Authenticate a user and return the token if the provided credentials are correct.

     * 

     * @param  \App\User   $user 

     * @return mixed

     */

    public function authenticate(User $user) {

        $this->validate($this->request, [

            'Email'     => 'required|email',

            'Password'  => 'required'

        ]);



        // Find the user by email

        $user = User::where('Email', $this->request->input('email'))->first();



        if (!$user) {

            // You wil probably have some sort of helpers or whatever

            // to make sure that you have the same response format for

            // differents kind of responses. But let's return the 

            // below respose for now.

            return response()->json([

                'error' => 'Email does not exist.'

            ], 400);

        }



        // Verify the password and generate the token

        if (Hash::check($this->request->input('Password'), $user->Password)) {
    
            $util=User::where('Email',$this->request->input('Email'))->first();
            return response()->json([

                'token' => 
				$this->jwt($user)

            ], 200);

        }



        // Bad Request response

        return response()->json([

            'error' => 'Email or password is wrong.'

        ], 400);

    }

}