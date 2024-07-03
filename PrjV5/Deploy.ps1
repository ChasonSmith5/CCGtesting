ssh -i ~/SSH/KLInternKey root@159.203.66.87 'kill -9 $(pgrep dotnet)'
# Frontend Processing
pushd "C:\Users\chason.smith\OneDrive - KnowledgeLake\Documents\GitHub\CCGtesting\PrjV5\FrontEnd"
tsc

# Remove existing zip file if it exists
if (Test-Path -Path htmfiles.zip) {
    Remove-Item -Path htmfiles.zip
}

# Zip the files
Compress-Archive -Path * -DestinationPath htmfiles.zip
popd

# Step 1: Publish the .NET project
pushd "C:\Users\chason.smith\OneDrive - KnowledgeLake\Documents\GitHub\CCGtesting\PrjV5\BackEnd\SolvedCCG.Api"
dotnet clean
dotnet publish -r linux-x64 --self-contained
popd

# Step 2: Change directory to the publish folder
pushd "C:\Users\chason.smith\OneDrive - KnowledgeLake\Documents\GitHub\CCGtesting\PrjV5\BackEnd\SolvedCCG.Api\bin\Release\net8.0\linux-x64"

# Remove existing zip file if it exists
if (Test-Path -Path files.zip) {
    Remove-Item -Path files.zip
}

# Zip the published files
Compress-Archive -Path * -DestinationPath files.zip
popd

# Step 4: Securely copy the necessary files to the remote server
scp -i ~/SSH/KLInternKey default root@159.203.66.87:/etc/nginx/sites-enabled
ssh -i ~/SSH/KLInternKey root@159.203.66.87 -t 'nginx -s reload'



pushd "C:\Users\chason.smith\OneDrive - KnowledgeLake\Documents\GitHub\CCGtesting\PrjV5\BackEnd\SolvedCCG.Api\bin\Release\net8.0\linux-x64"
scp -i ~/SSH/KLInternKey files.zip root@159.203.66.87:/root/
popd
pushd "C:\Users\chason.smith\OneDrive - KnowledgeLake\Documents\GitHub\CCGtesting\PrjV5\FrontEnd"
ssh -i ~/SSH/KLInternKey root@159.203.66.87 "mkdir -p /var/www/new/"
scp -i ~/SSH/KLInternKey htmfiles.zip root@159.203.66.87:/root/
popd
scp -i ~/SSH/KLInternKey mybashscript.sh root@159.203.66.87:/root/

# Step 5: SSH into the remote server and execute the bash script
# ssh -i ~/SSH/KLInternKey root@159.203.66.87 -t 'bash /root/mybashscript.sh'
ssh -i ~/SSH/KLInternKey root@159.203.66.87 'chmod +x mybashscript.sh'
ssh -i ~/SSH/KLInternKey root@159.203.66.87 'nohup bash -c "/root/mybashscript.sh > /root/myscript.log 2>&1 < /dev/null" &'
# nohup myscript.sh >myscript.log 2>&1 </dev/null &
