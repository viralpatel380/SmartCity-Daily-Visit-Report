Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @viralpatel380
Sign out
1
1 0 sai-sondarkar/yobykesAdmin Private
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
yobykesAdmin/app/src/main/java/com/electrotherm/yobykesadmin/Activities/LoginActivity.java
a77e75c  on Nov 16, 2017
@sai-sondarkar sai-sondarkar Updated Realtime retail
     
164 lines (131 sloc)  5.51 KB
package com.electrotherm.yobykesadmin.Activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Typeface;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.electrotherm.yobykesadmin.FirebaseExtra.FirebaseInfo;
import com.electrotherm.yobykesadmin.FirebaseExtra.FirebaseInit;
import com.electrotherm.yobykesadmin.Models.UserModel;
import com.electrotherm.yobykesadmin.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.Query;

public class LoginActivity extends AppCompatActivity {

    String TAG = LoginActivity.class.getSimpleName();
    private FirebaseAuth mAuth; // for the auth state

    TextView name_tx ;
    TextView singup_btn;
    EditText email_et;
    EditText password_et;
    private String uid;
    ProgressDialog dialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mAuth = FirebaseAuth.getInstance(); //  getting the instance in the context


        InitUiElements();
        CheckAuth();
    }

    public void CheckAuth(){
        FirebaseUser user = mAuth.getCurrentUser();
        if(user!=null){
            if(user.getUid()!=null){
                updateUI(user);
            }
        }
    }
    public void InitUiElements(){

        TextView tv = (TextView) findViewById(R.id.name);
        Typeface tt1 = Typeface.createFromAsset(getAssets(),"fonts/Rubik-MediumItalic.ttf");
        tv.setTypeface(tt1);

        name_tx = (TextView) findViewById(R.id.name);
        singup_btn = (TextView) findViewById(R.id.signup_btn);
        email_et = (EditText) findViewById(R.id.email_et);
        password_et = (EditText) findViewById(R.id.password_et);

        Typeface tt2 = Typeface.createFromAsset(getAssets(),"fonts/Rubik-Light.ttf");
        singup_btn.setTypeface(tt2);
        email_et.setTypeface(tt2);
        password_et.setTypeface(tt2);
    }

    public void onLoginClick() {  //methid for the login button

        String email = email_et.getText().toString();
        String password = password_et.getText().toString();

        if(email.equals("")||password.equals("")){
            Toast.makeText(LoginActivity.this, "Email Or PassWord Missing",
                    Toast.LENGTH_SHORT).show();
            return;
        }else{
//            spotsDialog = new SpotsDialog(this, R.style.Custom_login);
//            spotsDialog.show(); //// TODO: 30/8/17 add spots dialog lib
        }

        mAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithEmail:success");
                            FirebaseUser user = mAuth.getCurrentUser();
                            updateUI(user);
                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w(TAG, "signInWithEmail:failure", task.getException());
                            Toast.makeText(LoginActivity.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();
                        }
                    }
                });
    }

    public void updateUI(FirebaseUser user){
        Intent intent = new Intent(LoginActivity.this,HomeActivity.class);
        startActivity(intent);
        if(dialog!=null){
            dialog.dismiss();
        }

        finish();
    }

    public void getDataFromDb1(View view){
        onLoginClick();
    }

    public void getDataFromDb(View view){

        dialog = ProgressDialog.show(LoginActivity.this, "",
                "Loading. Please wait...", true);
        Query query = FirebaseInit.getDatabase().getReference().child(FirebaseInfo.EmployeeNode).orderByChild("divisionType").equalTo("admin");

        query.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(DataSnapshot dataSnapshot, String s) {
                UserModel userModel = dataSnapshot.getValue(UserModel.class);
                userModel.setUidInDB(dataSnapshot.getKey());
                if(userModel.getEmail().equals(email_et.getText().toString())){
                    onLoginClick();
                }
            }

            @Override
            public void onChildChanged(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onChildRemoved(DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(DataSnapshot dataSnapshot, String s) {

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }
}
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
Press h to open a hovercard with more details.